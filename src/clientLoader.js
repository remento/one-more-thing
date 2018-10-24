
//
// For the rescue page, the following div is assumed to exist on it:
//      <div id="one-more-thing"></div>
//

//
// Intended to go within script tags on a client page
// <script>
((w, d, opt) => {
    w.baton = opt;
    const scriptEl = document.createElement('script');
    scriptEl.src = opt.scriptSrc;
    d.querySelector('script').parentElement.appendChild(scriptEl);
})(window, document, {
    scriptSrc: '../client.bundle-dev.js',
    selector: 'a.site-nav__link[href*="pages/compare"]',
    recoveryUrl: '../pages/one-more-thing.html',
    recoveryContentId: 'one-more-thing'
});
// </script>

// shopify example:

(function(){
    if(navigator.userAgent.indexOf('MSIE') !==-1 || navigator.appVersion.indexOf('Trident/') > -1){
        return; // No love for Microsoft Internet Explorer
    }
    ((w, d, opt) => {
        w.baton = opt;
        const scriptEl = document.createElement('script');
        scriptEl.src = opt.scriptSrc;
        d.querySelector('script').parentElement.appendChild(scriptEl);
    })(window, document, {
        scriptSrc: 'https://www.orgaction.com/one-more-thing/client.bundle-prod.js',
        selector: 'a.site-nav__link[href*="pages/compare"]',
        recoveryUrl: '/pages/one-more-thing',
        recoveryContentId: 'one-more-thing'
    });
})();