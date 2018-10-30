import {Baton} from './modules/Baton.js';

(function () {
    'use strict';
    
    // MSIE Check - No IE11 or below
    if(navigator.userAgent.indexOf('MSIE') !==-1 || navigator.appVersion.indexOf('Trident/') > -1){
        (window.console||{warn:function(){}}).warn('baton: unsupported browser');
        return; 
    }

    var baton, 
        options = window.baton || {}; 
     
    // Run primary app immediately 
    initApp();

    // -- -- -- -- -- -- -- -- -- 

    // initApp 
    function initApp(){
        if (baton) baton.die();
        baton = new Baton(options);
    }

}());