// // Clydesdale
// ((d, w, log) => {
//     'use strict';

//     class Clydesdale {
//         constructor(opt) {
//             this.safeOrigin = w.location.origin;
//             this.pmOpenedKey = opt.pmOpenedKey;
//             this.storageKey = opt.storageKey;
//             this.markSession();
//             this.listen();
//         }

//         listen () {
//             w.addEventListener('message', this.receiveMessage.bind(this), false);
//         }

//         receiveMessage(event) {
//             if (event.origin !== this.safeOrigin)
//                 return;
//             log('baton: receiveMessage:', event);
//             if (event.data.inquiry === this.pmOpenedKey){
//                 // Respond to the inquiry that this is a recovery window
//                 event.source.postMessage( { response: this.pmOpenedKey, payload: true}, this.safeOrigin);
//             }
//         }

//         markSession() {
//             try{
//                 w.sessionStorage.setItem(this.storageKey, true);
//             }catch(e){
//                 log('baton: sessionStorage not available', e);
//             }
//         }
//     }

//     log('Clydesdale loaded');

//     // let clydesdale = 
//     new Clydesdale({
//         // Standard constants
//         pmOpenedKey: 'BATON_RECOVERED',
//         storageKey: 'BATON_RECOVERED'
//     });

// }) (document, window, location.hostname === 'localhost' ? window.console.log : function () { });

