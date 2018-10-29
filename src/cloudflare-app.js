import {Baton} from './modules/Baton.js';

(function () {
    /* global INSTALL, INSTALL_OPTIONS, INSTALL_PRODUCT */
    // note: install_id not escaped properly when used webpack build

    'use strict';
    
    // MSIE Check - No IE11 or below     //if (!window.addEventListener) return; // Check for IE9+
    if(navigator.userAgent.indexOf('MSIE') !==-1 || navigator.appVersion.indexOf('Trident/') > -1){
        (window.console||{warn:function(){}}).warn('baton: unsupported browser');
        return; 
    }

    var baton, 
        element,
        cfInstallId = INSTALL.siteId,   // note: install_id is replaced with "value", which breaks webpack build
        cfPreview = INSTALL.preview,    // limited availability
        cfProxy = INSTALL.proxy,        // limited availability
        options = INSTALL_OPTIONS,    // I-NSTALL_OPTIONS: CloudflareApps.installs['preview'].options
        cfProduct = INSTALL_PRODUCT,  // I-NSTALL_PRODUCT:
        postMsg = ((cfPreview||{}).postMessage||{}).direct;
    window.console.log('cfProduct', cfProduct);
    if (cfInstallId === 'preview' && postMsg){
        options.postMessage = postMsg;
    }
    // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
    window.INSTALL_SCOPE = {
        setOptions: function setOptions(nextOptions) {
            options = nextOptions;
            initApp();
        }
    };

    // preview only - Sample content for https://typical.design - inject after page loaded
    if (cfInstallId === 'preview' && cfProxy.originalURL.parsed.host === 'typical.design'){ 
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectTestLinks);
        } else {
            injectTestLinks();
        }
    }

    // Run primary app immediately 
    initApp();

    // -- -- -- -- -- -- -- -- -- 

    // initApp runs every time the options are updated
    function initApp(){
        if (baton) baton.die();
        baton = new Baton(options);
    }

    // Inject test links in cloudflare typical.design page
    function injectTestLinks(){
        element = INSTALL.createElement({ selector: '.blog-posts', method: 'before' });
        element.innerHTML = '<ol><li><a href="/key-action.html">Compare: Key action</a></li><li><a href="/other-action.html">Other action A</a></li></ol>';
        window.console.log('baton: Sample links injected onto preview page');
    }
    

}());