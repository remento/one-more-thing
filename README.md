# one-more-thing
Recover portion of exited site traffic

Getting a lead is expensive – and the slightest distraction can take them away. This app ensures visitors will be steered back to your key conversion goals – even after they have left your site.

Convert more visitors by leaving a tab behind as they navigate your site. Site visitors find this tab after leaving your site - providing a second chance to rescue those leads.

Entice them with reminders, offers, surveys, email subscriptions, or even their shopping cart - the content of this tab is yours to decide.

## Local build & testing
Install dependencies for build and a static webserver to test
```
npm install
npm start
```
You can access the test pages at: http://localhost:8080/

## Build
JS comes packaged in multiple versions

### CloudFlare Build
See the pages in example for how to include
Currently building with 'development' options
```
npx webpack --config webpack.config.cloudflare.js
```

### Generic Build
See the pages in example for how to include
Note: Updates pending to sync with CloudFlare version

Production build
```
npx webpack --config webpack.config.prod.js
```

Dev build
```
npx webpack --config webpack.config.dev.js
```


