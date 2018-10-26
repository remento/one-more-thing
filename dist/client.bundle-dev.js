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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n// The CTA may not exist yet, lazy loading, dynamic creation... listen for all clicks and see if it matches\r\n// note: click may not capture \"enter key\" or \"touch events\"\r\n// \r\n// note: the CTA must be a link/anchor with a href determining where it leads - no JS navigation \r\n// \r\n((d, w, con) => {\r\n    'use strict';\r\n    const con_log = con.log||con, \r\n        con_debug = con.debug||con,\r\n        con_warn = w.console.warn; // warnings are always shown\r\n\r\n    class BatonClient {\r\n        constructor (options){\r\n            this.pollFreqMS = 1500;\r\n            this.recoveryDelayMS = 100;\r\n            this.safeOrigin = w.location.origin;\r\n            this.pmOpenedKey = options.pmOpenedKey;\r\n            this.selector = options.selector;\r\n            this.storageKey = options.storageKey;\r\n            this.recoveryUrl = options.recoveryUrl;\r\n            this.recoveryContentId = options.recoveryContentId;\r\n            this.recoveryExists = false;\r\n            this.opener = w.opener;\r\n\r\n            this.listenMessages();\r\n            if(this.isRecoveryPage){\r\n                this.markSession();\r\n            }else{\r\n                this.listenInteraction();\r\n                this.loadSession();\r\n                this.pollOpener();\r\n            }\r\n        }\r\n\r\n        loadSession(){\r\n            try{\r\n                this.recoveryExists = w.sessionStorage.getItem(this.storageKey);\r\n            }catch(e){\r\n                con_log('baton: cannot read sessionStorage', e);\r\n            }\r\n        }\r\n\r\n        pollOpener() {\r\n            con_log('baton:pollOpener',{\r\n                recoveryExists: this.recoveryExists,\r\n                opener : this.opener ,\r\n                pollOpener_intervalID: this.pollOpener_intervalID\r\n            });\r\n            if (!this.recoveryExists && this.opener && !this.pollOpener_intervalID){\r\n                this.pollOpener_intervalID = setInterval(()=>{\r\n                    con_debug('baton: send msg()', this.opener, this.safeOrigin);\r\n                    this.opener.postMessage({ inquiry: this.pmOpenedKey }, this.safeOrigin);\r\n                }, this.pollFreqMS);\r\n            }\r\n        }\r\n\r\n        cancelPollOpener() {\r\n            clearInterval(this.pollOpener_intervalID);\r\n            delete this.pollOpener_intervalID;\r\n        }\r\n\r\n        receiveMessage (event) {\r\n            if (event.origin !== this.safeOrigin)\r\n                return;\r\n            con_log('baton: receiveMessage:', event);\r\n            if(this.isRecoveryPage){\r\n                if (event.data.inquiry === this.pmOpenedKey){\r\n                    // Respond to the inquiry that this is a recovery window\r\n                    event.source.postMessage( { response: this.pmOpenedKey, payload: true}, this.safeOrigin);\r\n                }\r\n            }else{\r\n                if (event.data.response === this.pmOpenedKey && event.data.payload === true ){\r\n                    // Page that spawned this one replies that it is a recovery page\r\n                    this.markSession();\r\n                    this.cancelPollOpener(); \r\n                }\r\n            }\r\n        }\r\n        \r\n        listenMessages() {\r\n            w.addEventListener('message', this.receiveMessage.bind(this), false);\r\n        }\r\n\r\n        listenInteraction() {\r\n            d.body.addEventListener('click', (event) => {\r\n                // User link is directed to a new window/tab\r\n                let  clickedEl = event.target; // the event target could be an item within our link target... css has a \"pointer\" that could help\r\n                // Check if our selector matches the element that was clicked, or any of its parents\r\n                if ( !this.recoveryExists) {\r\n                    let linkEl, linkFound = event.path.some( (node) => { \r\n                        // if (node.nodeName !== 'A'){ return false; }\r\n                        // Array.from(node.parentElement.children).indexOf(node);\r\n                        linkEl = node;\r\n                        let possibleTarget = !!node.parentElement && node.parentElement.querySelector(this.selector); \r\n                        // Is the clickedEl in, or equal to, the possibleTarget?\r\n                        let testEl = clickedEl;\r\n                        do {\r\n                            if (possibleTarget === testEl){\r\n                                return true;\r\n                            }\r\n                            testEl = testEl.parentElement;\r\n                        } while (testEl && node.parentElement !== testEl); // don't test higher then needed\r\n                        return false;\r\n                    });\r\n                    if (linkFound){\r\n                        con_log('baton: key action triggered', { selector: this.selector, event: event});\r\n                        linkEl.target = '_blank';  \r\n                        // event._preventDefault = event.preventDefault; \r\n                        event.preventDefault = function(){\r\n                            con_warn('baton: preventDefault bypassed to preserve link window targeting (target=\"_blank\")');\r\n                        }; \r\n                        setTimeout(this.loadRecoveryPage.bind(this), this.recoveryDelayMS);\r\n                    }\r\n                }\r\n            }, { capture: true, once: false, passive: false });\r\n        }\r\n\r\n        loadRecoveryPage() {\r\n            // Recovery Page is loaded into the existing tab/window\r\n            con_log('baton: loading recovery page', this.recoveryUrl);\r\n            this.markSession();\r\n            w.location.href = this.recoveryUrl;\r\n        }\r\n\r\n        markSession() {\r\n            this.recoveryExists = true;\r\n            try{\r\n                w.sessionStorage.setItem(this.storageKey, true);\r\n            }catch(e){\r\n                con_log('baton: sessionStorage not available', e);\r\n            }\r\n        }\r\n\r\n        get isRecoveryPage () {\r\n            return !! this.recoveryContentEl || w.location.pathname === this.recoveryUrl;\r\n        }\r\n\r\n        get recoveryContentEl () {\r\n            return !! d.getElementById(this.recoveryContentId);\r\n        }\r\n    }\r\n\r\n    // ---------------- ---------------- ---------------- ---------------- //\r\n\r\n    con_log('baton: client.js');  \r\n    \r\n    const \r\n        optFromClient = w['baton']||{},\r\n        optProcessed = {}, \r\n        optDefaults = {\r\n            // Client specified constants\r\n            selector: 'a.site-nav__link[href*=\"pages/compare\"]',\r\n            recoveryUrl: '/pages/one-more-thing',\r\n            recoveryContentId:'one-more-thing',\r\n            // Standard constants\r\n            pmOpenedKey: 'BATON_RECOVERED', \r\n            storageKey: 'BATON_RECOVERED'\r\n        };\r\n    for ( let key in optDefaults){\r\n        optProcessed[key] = optFromClient[key] || optDefaults[key];\r\n    }\r\n\r\n    new BatonClient(optProcessed);\r\n \r\n}) (document, window, location.hostname === 'localhost' ? window.console : function () { });\r\n\r\n\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ })

/******/ });