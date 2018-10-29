import {BatonDefaults} from './BatonDefaults.js';
export class Baton extends BatonDefaults {
    constructor (options){
        super(options);
        const noop = function(){},
            stubLogger = {log:noop,warn:noop,debug:noop},
            logger = this.forceLogging ? window.console || stubLogger : stubLogger;
        this.con_warn = logger.warn;
        this.con_log = logger.log;
        this.con_debug = logger.debug;
        this.store = {};
        this.openingRescue = false;
        this.listenMessages(); 
        if (this.isRecoveryPage()) {
            this.recoveryExists = true;
        }else if (!this.recoveryExists){
            this.pollOpener();
            this.listenInteraction();
        }
    }

    pollOpener() {
        // Poll the opener for a limited amount of time, providing it time to load
        const 
            startPolling = this.opener && this.opener !== window && !this.recoveryExists && !this.pollOpener_intervalID,
            performPollFn = () => {
                if (this.recoveryExists || this.dead) {
                    this.cancelPollOpener();
                    return; 
                }
                this.con_debug('baton: pollOpener: interval: send inquiry', this.safeOrigin);
                //this.opener.postMessage({ type: this.pmOpenedKey, inquiry: this.pmOpenedKey }, this.safeOrigin);
                this.postMessage.call(this.opener,{ type: this.pmOpenedKey, inquiry: this.pmOpenedKey }, this.safeOrigin);
            };
        this.con_log('baton: pollOpener: startPolling:', startPolling);
        if (startPolling){
            this.pollOpener_intervalID = setInterval(performPollFn, this.pollFreqMS);
            setTimeout(()=>{this.cancelPollOpener();}, this.pollStopAfterMs);
            performPollFn();
        }
    }

    cancelPollOpener() {
        this.con_log('baton: cancelPollOpener');
        clearInterval(this.pollOpener_intervalID);
        delete this.pollOpener_intervalID;
    }

    receiveMessage (event) {
        const 
            eventCheckType = this.pmOpenedKey,
            eventType = event.data.type,
            isRecoveryPage = this.isRecoveryPage();
        if (this.dead || eventType !== eventCheckType || event.source === window) // || event.origin !== this.safeOrigin
            return;      
        this.con_log('baton: receiveMessage:', event.data);
        if(isRecoveryPage && event.data.inquiry){
            // Respond to the inquiry that this is a recovery window
            this.con_log('baton: receiveMessage: RESPOND');
            //event.source.postMessage( { type: eventCheckType, response: eventCheckType, payload: true}, this.safeOrigin);
            this.postMessage.call(event.source, { type: eventCheckType, response: eventCheckType, payload: true}, this.safeOrigin);
        }
        if(!isRecoveryPage && event.data.response){ 
            // Page that spawned this one replies that it is a recovery page
            this.recoveryExists = true;
            this.stop();
        }
    }
    
    listenMessages() {
        const 
            cbFn = this.receiveMessage.bind(this),
            capture = false;
        window.addEventListener('message', cbFn, capture);
        this.removeListenMessages = () => {
            window.removeEventListener('message', cbFn, capture);
        };
    }

    removeListenMessages(){
        this.con_log('baton: removeListenMessages: no listener configured to remove');
    }

    listenInteraction() {
        const handleClickFn = (event) => {
                if (this.dead) return;
                // User link is directed to a new window/tab
                let  clickedEl = event.target; // the event target could be an item within our link target... css has a "pointer" that could help
                // Check if our selector matches the element that was clicked, or any of its parents
                if ( !this.recoveryExists) {
                    let linkEl,
                        // event.composedPath() is the standard - but limited support...
                        eventPath = (event.composedPath && event.composedPath()) || event.path ||
                            [clickedEl.parentElement.parentElement, clickedEl.parentElement, clickedEl],
                        linkFound = eventPath.some( (node) => { 
                            // if (node.nodeName !== 'A'){ return false; }
                            // Array.from(node.parentElement.children).indexOf(node);
                            linkEl = node;
                            let possibleTarget = !!node.parentElement && node.parentElement.querySelector(this.selector); 
                            // Is the clickedEl in, or equal to, the possibleTarget?
                            let testEl = clickedEl;
                            do {
                                if (possibleTarget === testEl){
                                    return true;
                                }
                                testEl = testEl.parentElement;
                            } while (testEl && node.parentElement !== testEl); // don't test higher then needed
                            return false;
                        });
                    if (linkFound && linkEl.nodeName === 'A' && !linkEl.target){
                        this.con_log('baton: key action triggered', { selector: this.selector, event: event});
                        linkEl.target = '_blank';  
                        // event._preventDefault = event.preventDefault; 
                        event.preventDefault = function(){
                            this.con_warn('baton: preventDefault bypassed to preserve link window targeting (target="_blank")');
                        }; 
                        setTimeout(this.loadRecoveryPage.bind(this), this.recoveryDelayMS);
                    }
                }
            },
            listenerOptions = { capture: true, once: false, passive: false };
        document.body.addEventListener('click', handleClickFn, listenerOptions);
        this.removeListenInteraction = () => {
            document.body.removeEventListener('click', handleClickFn, listenerOptions);
        };
    }
    
    removeListenInteraction(){
        this.con_log('baton: removeListenInteraction: no listener configured to remove');
    }

    loadRecoveryPage() {
        // Recovery Page is loaded into the existing tab/window
        this.con_log('baton: loading recovery page', this.recoveryUrl);
        this.recoveryExists = true;
        this.openingRescue = true;
        //document.body.innerHTML = this.loadingBodyContent;
        // INSTALL.proxy.originalURL
        window.location.href = this.recoveryUrl;
    }
 
    isRecoveryPage () {
        return this.recoveryUrl === window.location.href || this.recoveryUrl === window.location.pathname || !!this.recoveryContentEl || this.openingRescue;
    }

    get recoveryContentEl () {
        return document.getElementById(this.recoveryContentId);
    }

    get opener () {return window.opener;}

    get safeOrigin () {
        return '*';
        //return window.location.origin;
    }

    get recoveryExists () {
        return !!this.storeGetKey(this.storageKey);
    }

    set recoveryExists (value) {
        if (value) this.storeSetKey(this.storageKey, true);
        else this.storeRemoveKey(this.storageKey);
    }   

    storeSetKey(key,value){
        try{
            window.sessionStorage.setItem(key, value);
        }catch(e){
            this.con_log('baton: cannot SET sessionStorage:', key, ':', e.message, e.name, e.code);
        }
        this.store[key] = value;
        return value;
    }
    storeGetKey(key){
        try{
            return window.sessionStorage.getItem(key);
        }catch(e){
            this.con_log('baton: cannot READ sessionStorage:', key, ':',  e.message, e.name, e.code);
            return this.store[key];
        }
    }
    storeRemoveKey(key){
        try{
            window.sessionStorage.removeItem(key);
        }catch(e){
            this.con_log('baton: cannot READ sessionStorage:', key, ':',  e.message, e.name, e.code);
        }
        delete this.store[key];
    }

    stop (){
        this.con_log('baton: stop');
        this.cancelPollOpener(); 
        this.removeListenMessages(); 
        this.removeListenInteraction(); 
    }

    die () {
        this.con_log('baton: die');
        this.stop();
        this.recoveryExists = false;
        this.dead = true;
    }
}

