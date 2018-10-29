export class BatonDefaults {
    constructor (options){
        const providedOptions = options || {};
        Object.keys(BatonDefaults.prototype)
            .forEach(key => {
                if (providedOptions.hasOwnProperty(key))
                    this[key] = providedOptions[key];
            });
    }
}
// The following options can be passed in/overrode 
BatonDefaults.prototype.postMessage = window.postMessage;
BatonDefaults.prototype.selector = 'a';
BatonDefaults.prototype.recoveryUrl = '/one-more-thing/';
BatonDefaults.prototype.recoveryContentId = 'one-more-thing';
BatonDefaults.prototype.pmOpenedKey = 'baton-one-more-thing';
BatonDefaults.prototype.storageKey = 'baton-one-more-thing';
BatonDefaults.prototype.loadingBodyContent = '<h1>One More Thing...</h1>';
BatonDefaults.prototype.pollFreqMS = 1500;
BatonDefaults.prototype.pollStopAfterMs = 20000;
BatonDefaults.prototype.recoveryDelayMS =  100;
BatonDefaults.prototype.forceLogging = true;

