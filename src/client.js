
// The CTA may not exist yet, lazy loading, dynamic creation... listen for all clicks and see if it matches
// note: click may not capture "enter key" or "touch events"
// 
// note: the CTA must be a link/anchor with a href determining where it leads - no JS navigation 
// 
((d, w, con) => {
    'use strict';
    const con_log = con.log||con, 
        con_debug = con.debug||con,
        con_warn = w.console.warn; // warnings are always shown

    class BatonClient {
        constructor (options){
            this.pollFreqMS = 1500;
            this.recoveryDelayMS = 100;
            this.safeOrigin = w.location.origin;
            this.pmOpenedKey = options.pmOpenedKey;
            this.selector = options.selector;
            this.storageKey = options.storageKey;
            this.recoveryUrl = options.recoveryUrl;
            this.recoveryContentId = options.recoveryContentId;
            this.recoveryExists = false;
            this.opener = w.opener;

            this.listenMessages();
            if(this.isRecoveryPage){
                this.markSession();
            }else{
                this.listenInteraction();
                this.loadSession();
                this.pollOpener();
            }
        }

        loadSession(){
            try{
                this.recoveryExists = w.sessionStorage.getItem(this.storageKey);
            }catch(e){
                con_log('baton: cannot read sessionStorage', e);
            }
        }

        pollOpener() {
            con_log('baton:pollOpener',{
                recoveryExists: this.recoveryExists,
                opener : this.opener ,
                pollOpener_intervalID: this.pollOpener_intervalID
            });
            if (!this.recoveryExists && this.opener && !this.pollOpener_intervalID){
                this.pollOpener_intervalID = setInterval(()=>{
                    con_debug('baton: send msg()', this.opener, this.safeOrigin);
                    this.opener.postMessage({ inquiry: this.pmOpenedKey }, this.safeOrigin);
                }, this.pollFreqMS);
            }
        }

        cancelPollOpener() {
            clearInterval(this.pollOpener_intervalID);
            delete this.pollOpener_intervalID;
        }

        receiveMessage (event) {
            if (event.origin !== this.safeOrigin)
                return;
            con_log('baton: receiveMessage:', event);
            if(this.isRecoveryPage){
                if (event.data.inquiry === this.pmOpenedKey){
                    // Respond to the inquiry that this is a recovery window
                    event.source.postMessage( { response: this.pmOpenedKey, payload: true}, this.safeOrigin);
                }
            }else{
                if (event.data.response === this.pmOpenedKey && event.data.payload === true ){
                    // Page that spawned this one replies that it is a recovery page
                    this.markSession();
                    this.cancelPollOpener(); 
                }
            }
        }
        
        listenMessages() {
            w.addEventListener('message', this.receiveMessage.bind(this), false);
        }

        listenInteraction() {
            d.body.addEventListener('click', (event) => {
                // User link is directed to a new window/tab
                let  clickedEl = event.target; // the event target could be an item within our link target... css has a "pointer" that could help
                // Check if our selector matches the element that was clicked, or any of its parents
                if ( !this.recoveryExists) {
                    let linkEl, linkFound = event.path.some( (node) => { 
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
                    if (linkFound){
                        con_log('baton: key action triggered', { selector: this.selector, event: event});
                        linkEl.target = '_blank';  
                        // event._preventDefault = event.preventDefault; 
                        event.preventDefault = function(){
                            con_warn('baton: preventDefault bypassed to preserve link window targeting (target="_blank")');
                        }; 
                        setTimeout(this.loadRecoveryPage.bind(this), this.recoveryDelayMS);
                    }
                }
            }, { capture: true, once: false, passive: false });
        }

        loadRecoveryPage() {
            // Recovery Page is loaded into the existing tab/window
            con_log('baton: loading recovery page', this.recoveryUrl);
            this.markSession();
            w.location.href = this.recoveryUrl;
        }

        markSession() {
            this.recoveryExists = true;
            try{
                w.sessionStorage.setItem(this.storageKey, true);
            }catch(e){
                con_log('baton: sessionStorage not available', e);
            }
        }

        get isRecoveryPage () {
            return !! this.recoveryContentEl || w.location.pathname === this.recoveryUrl;
        }

        get recoveryContentEl () {
            return !! d.getElementById(this.recoveryContentId);
        }
    }

    // ---------------- ---------------- ---------------- ---------------- //

    con_log('baton: client.js');  
    
    const 
        optFromClient = w['baton']||{},
        optProcessed = {}, 
        optDefaults = {
            // Client specified constants
            selector: 'a.site-nav__link[href*="pages/compare"]',
            recoveryUrl: '/pages/one-more-thing',
            recoveryContentId:'one-more-thing',
            // Standard constants
            pmOpenedKey: 'BATON_RECOVERED', 
            storageKey: 'BATON_RECOVERED'
        };
    for ( let key in optDefaults){
        optProcessed[key] = optFromClient[key] || optDefaults[key];
    }

    new BatonClient(optProcessed);
 
}) (document, window, location.hostname === 'localhost' ? window.console : function () { });

