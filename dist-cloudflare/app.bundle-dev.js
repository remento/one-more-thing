/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cloudflare-app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cloudflare-app.js":
/*!*******************************!*\
  !*** ./src/cloudflare-app.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Baton_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Baton.js */ \"./src/modules/Baton.js\");\n\n\n(function () {\n    /* global INSTALL, INSTALL_OPTIONS, INSTALL_PRODUCT */\n    // note: install_id not escaped properly when used webpack build\n\n    'use strict';\n    \n    // MSIE Check - No IE11 or below     //if (!window.addEventListener) return; // Check for IE9+\n    if(navigator.userAgent.indexOf('MSIE') !==-1 || navigator.appVersion.indexOf('Trident/') > -1){\n        (window.console||{warn:function(){}}).warn('baton: unsupported browser');\n        return; \n    }\n\n    var baton, \n        element,\n        cfInstallId = INSTALL.siteId,   // note: install_id is replaced with \"value\", which breaks webpack build\n        cfPreview = INSTALL.preview,    // limited availability\n        cfProxy = INSTALL.proxy,        // limited availability\n        options = INSTALL_OPTIONS,    // I-NSTALL_OPTIONS: CloudflareApps.installs['preview'].options\n        cfProduct = INSTALL_PRODUCT,  // I-NSTALL_PRODUCT:\n        postMsg = ((cfPreview||{}).postMessage||{}).direct;\n    window.console.log('cfProduct', cfProduct);\n    if (cfInstallId === 'preview' && postMsg){\n        options.postMessage = postMsg;\n    }\n    // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.\n    window.INSTALL_SCOPE = {\n        setOptions: function setOptions(nextOptions) {\n            options = nextOptions;\n            initApp();\n        }\n    };\n\n    // preview only - Sample content for https://typical.design - inject after page loaded\n    if (cfInstallId === 'preview' && cfProxy.originalURL.parsed.host === 'typical.design'){ \n        if (document.readyState === 'loading') {\n            document.addEventListener('DOMContentLoaded', injectTestLinks);\n        } else {\n            injectTestLinks();\n        }\n    }\n\n    // Run primary app immediately \n    initApp();\n\n    // -- -- -- -- -- -- -- -- -- \n\n    // initApp runs every time the options are updated\n    function initApp(){\n        if (baton) baton.die();\n        baton = new _modules_Baton_js__WEBPACK_IMPORTED_MODULE_0__[\"Baton\"](options);\n    }\n\n    // Inject test links in cloudflare typical.design page\n    function injectTestLinks(){\n        element = INSTALL.createElement({ selector: '.blog-posts', method: 'before' });\n        element.innerHTML = '<ol><li><a href=\"/key-action.html\">Compare: Key action</a></li><li><a href=\"/other-action.html\">Other action A</a></li></ol>';\n        window.console.log('baton: Sample links injected onto preview page');\n    }\n    \n\n}());\n\n//# sourceURL=webpack:///./src/cloudflare-app.js?");

/***/ }),

/***/ "./src/modules/Baton.js":
/*!******************************!*\
  !*** ./src/modules/Baton.js ***!
  \******************************/
/*! exports provided: Baton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Baton\", function() { return Baton; });\n/* harmony import */ var _BatonDefaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BatonDefaults.js */ \"./src/modules/BatonDefaults.js\");\n\nclass Baton extends _BatonDefaults_js__WEBPACK_IMPORTED_MODULE_0__[\"BatonDefaults\"] {\n    constructor (options){\n        super(options);\n        const noop = function(){},\n            stubLogger = {log:noop,warn:noop,debug:noop},\n            logger = this.forceLogging ? window.console || stubLogger : stubLogger;\n        this.con_warn = logger.warn;\n        this.con_log = logger.log;\n        this.con_debug = logger.debug;\n        this.store = {};\n        this.openingRescue = false;\n        \n\n        // consider: \n        //      option BIND ORIGIN? target page needs script... \n        //      build origin - \n        //              for receiving messages\n        //              target 'opener'\n\n\n        this.listenMessages(); \n        if (this.isRecoveryPage()) {\n            this.recoveryExists = true;\n        }else if (!this.recoveryExists){\n            this.pollOpener();\n            this.listenInteraction();\n        }\n    }\n\n    pollOpener() {\n        // Poll the opener for a limited amount of time, providing it time to load\n        const \n            startPolling = this.opener && this.opener !== window && !this.recoveryExists && !this.pollOpener_intervalID,\n            performPollFn = () => {\n                if (this.recoveryExists || this.dead) {\n                    this.cancelPollOpener();\n                    return; \n                }\n                this.con_debug('baton: pollOpener: interval: send inquiry', this.safeOrigin);\n                //this.opener.postMessage({ type: this.pmOpenedKey, inquiry: this.pmOpenedKey }, this.safeOrigin);\n                this.postMessage.call(this.opener,{ type: this.pmOpenedKey, inquiry: this.pmOpenedKey }, this.safeOrigin);\n            };\n        this.con_log('baton: pollOpener: startPolling:', startPolling);\n        if (startPolling){\n            this.pollOpener_intervalID = setInterval(performPollFn, this.pollFreqMS);\n            setTimeout(()=>{this.cancelPollOpener();}, this.pollStopAfterMs);\n            performPollFn();\n        }\n    }\n\n    cancelPollOpener() {\n        this.con_log('baton: cancelPollOpener');\n        clearInterval(this.pollOpener_intervalID);\n        delete this.pollOpener_intervalID;\n    }\n\n    receiveMessage (event) {\n        const \n            eventCheckType = this.pmOpenedKey,\n            eventType = event.data.type,\n            isRecoveryPage = this.isRecoveryPage();\n        if (this.dead || eventType !== eventCheckType || event.source === window) // || event.origin !== this.safeOrigin\n            return;      \n        this.con_log('baton: receiveMessage:', event.data);\n        if(isRecoveryPage && event.data.inquiry){\n            // Respond to the inquiry that this is a recovery window\n            this.con_log('baton: receiveMessage: RESPOND');\n            //event.source.postMessage( { type: eventCheckType, response: eventCheckType, payload: true}, this.safeOrigin);\n            this.postMessage.call(event.source, { type: eventCheckType, response: eventCheckType, payload: true}, this.safeOrigin);\n        }\n        if(!isRecoveryPage && event.data.response){ \n            // Page that spawned this one replies that it is a recovery page\n            this.recoveryExists = true;\n            this.stop();\n        }\n    }\n    \n    listenMessages() {\n        const \n            cbFn = this.receiveMessage.bind(this),\n            capture = false;\n        window.addEventListener('message', cbFn, capture);\n        this.removeListenMessages = () => {\n            window.removeEventListener('message', cbFn, capture);\n        };\n    }\n\n    removeListenMessages(){\n        this.con_log('baton: removeListenMessages: no listener configured to remove');\n    }\n\n    listenInteraction() {\n        const handleClickFn = (event) => {\n                if (this.dead) return;\n                // User link is directed to a new window/tab\n                let  clickedEl = event.target; // the event target could be an item within our link target... css has a \"pointer\" that could help\n                // Check if our selector matches the element that was clicked, or any of its parents\n                if ( !this.recoveryExists) {\n                    let linkEl, linkFound = event.path.some( (node) => { \n                        // if (node.nodeName !== 'A'){ return false; }\n                        // Array.from(node.parentElement.children).indexOf(node);\n                        linkEl = node;\n                        let possibleTarget = !!node.parentElement && node.parentElement.querySelector(this.selector); \n                        // Is the clickedEl in, or equal to, the possibleTarget?\n                        let testEl = clickedEl;\n                        do {\n                            if (possibleTarget === testEl){\n                                return true;\n                            }\n                            testEl = testEl.parentElement;\n                        } while (testEl && node.parentElement !== testEl); // don't test higher then needed\n                        return false;\n                    });\n                    if (linkFound && linkEl.nodeName === 'A' && !linkEl.target){\n                        this.con_log('baton: key action triggered', { selector: this.selector, event: event});\n                        linkEl.target = '_blank';  \n                        // event._preventDefault = event.preventDefault; \n                        event.preventDefault = function(){\n                            this.con_warn('baton: preventDefault bypassed to preserve link window targeting (target=\"_blank\")');\n                        }; \n                        setTimeout(this.loadRecoveryPage.bind(this), this.recoveryDelayMS);\n                    }\n                }\n            },\n            listenerOptions = { capture: true, once: false, passive: false };\n        document.body.addEventListener('click', handleClickFn, listenerOptions);\n        this.removeListenInteraction = () => {\n            document.body.removeEventListener('click', handleClickFn, listenerOptions);\n        };\n    }\n    \n    removeListenInteraction(){\n        this.con_log('baton: removeListenInteraction: no listener configured to remove');\n    }\n\n    loadRecoveryPage() {\n        // Recovery Page is loaded into the existing tab/window\n        this.con_log('baton: loading recovery page', this.recoveryUrl);\n        this.recoveryExists = true;\n        this.openingRescue = true;\n        //document.body.innerHTML = this.loadingBodyContent;\n        // INSTALL.proxy.originalURL\n        window.location.href = this.recoveryUrl;\n    }\n \n    isRecoveryPage () {\n        return this.recoveryUrl === window.location.href || this.recoveryUrl === window.location.pathname || !!this.recoveryContentEl || this.openingRescue;\n    }\n\n    get recoveryContentEl () {\n        return document.getElementById(this.recoveryContentId);\n    }\n\n    get opener () {return window.opener;}\n\n    get safeOrigin () {\n        return '*';\n        //return window.location.origin;\n    }\n\n    get recoveryExists () {\n        return !!this.storeGetKey(this.storageKey);\n    }\n\n    set recoveryExists (value) {\n        if (value) this.storeSetKey(this.storageKey, true);\n        else this.storeRemoveKey(this.storageKey);\n    }   \n\n    storeSetKey(key,value){\n        try{\n            window.sessionStorage.setItem(key, value);\n        }catch(e){\n            this.con_log('baton: cannot SET sessionStorage:', key, ':', e.message, e.name, e.code);\n        }\n        this.store[key] = value;\n        return value;\n    }\n    storeGetKey(key){\n        try{\n            return window.sessionStorage.getItem(key);\n        }catch(e){\n            this.con_log('baton: cannot READ sessionStorage:', key, ':',  e.message, e.name, e.code);\n            return this.store[key];\n        }\n    }\n    storeRemoveKey(key){\n        try{\n            window.sessionStorage.removeItem(key);\n        }catch(e){\n            this.con_log('baton: cannot READ sessionStorage:', key, ':',  e.message, e.name, e.code);\n        }\n        delete this.store[key];\n    }\n\n    stop (){\n        this.con_log('baton: stop');\n        this.cancelPollOpener(); \n        this.removeListenMessages(); \n        this.removeListenInteraction(); \n    }\n\n    die () {\n        this.con_log('baton: die');\n        this.stop();\n        this.recoveryExists = false;\n        this.dead = true;\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/Baton.js?");

/***/ }),

/***/ "./src/modules/BatonDefaults.js":
/*!**************************************!*\
  !*** ./src/modules/BatonDefaults.js ***!
  \**************************************/
/*! exports provided: BatonDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BatonDefaults\", function() { return BatonDefaults; });\nclass BatonDefaults {\n    constructor (options){\n        const providedOptions = options || {};\n        Object.keys(BatonDefaults.prototype)\n            .forEach(key => {\n                if (providedOptions.hasOwnProperty(key))\n                    this[key] = providedOptions[key];\n            });\n    }\n}\n// The following options can be passed in/overrode \nBatonDefaults.prototype.postMessage = window.postMessage;\nBatonDefaults.prototype.selector = 'a';\nBatonDefaults.prototype.recoveryUrl = '/one-more-thing/';\nBatonDefaults.prototype.recoveryContentId = 'one-more-thing';\nBatonDefaults.prototype.pmOpenedKey = 'baton-one-more-thing';\nBatonDefaults.prototype.storageKey = 'baton-one-more-thing';\nBatonDefaults.prototype.loadingBodyContent = '<h1>One More Thing...</h1>';\nBatonDefaults.prototype.pollFreqMS = 1500;\nBatonDefaults.prototype.pollStopAfterMs = 20000;\nBatonDefaults.prototype.recoveryDelayMS =  100;\nBatonDefaults.prototype.forceLogging = true;\n\n\n\n//# sourceURL=webpack:///./src/modules/BatonDefaults.js?");

/***/ })

/******/ });