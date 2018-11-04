# one-more-thing
Getting leads is expensive – and the slightest distraction can take them away. One-more-thing ensures visitors will be steered back to your key conversion goals – even if they have already left your site!

It works by leaving a tab behind as visitors navigate your site. Site visitors find this tab after leaving your site - and are reminded to pickup where they left off. Entice lost leads with reminders, offers, surveys, email subscriptions, or even their shopping cart - the content of this tab is yours to decide.

## Standalone Mode

Use one of the code examples below. Update the options as desired. Note that "bundle-dev" can be replaced with "bundle-prod" for a leaner build that lacks console logging.

### Standalone Example #1: Script tag

```javascript
 <script>
    // See src/modules/BatonDefaults for a full list of options
    window.baton = {recoveryUrl:'/examples/standalone/one-more-thing.html', selector:'a'};
</script>
<script src="https://s3.amazonaws.com/one-more-thing/app.standalone.bundle-dev.js" async="async"></script>
```

### Standalone Example #2: Injection - Shopify Example

```javascript
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
        scriptSrc: 'https://s3.amazonaws.com/one-more-thing/app.standalone.bundle-dev.js',
        selector: 'a.site-nav__link[href*="pages/compare"]',
        recoveryUrl: '/pages/one-more-thing',
        recoveryContentId: 'one-more-thing'
    });
})();
```

### Cloudflare (Content Delivery Network) Integration

All configuration is done via CloudFlare app. If linking to a rescue page outside that ecosystem, use one of the standalone examples above on that page.

## Options
See src/modules/BatonDefaults.js for a complete list of runtime options

## Install dependencies & Running the test webserver
Install dependencies for build and a static webserver to test
```
npm install
npm start
```
You can access the test pages at: http://localhost:8080/

Serves content from: `./dist/examples`

## Build
JS comes packaged in multiple versions

### Development Build
See the pages in example for how to include
Building with 'development' options including source maps and console logging enabled
```
> npm run-script build-dev
```
which is an alias for:  `> npx webpack --config webpack.config.dev.js`


### Production Build
```
> npm run build-prod
```
which is an alias for:  `> npx webpack --config webpack.config.js`