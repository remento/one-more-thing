# one-more-thing
Recover portion of exited site traffic

Getting a lead is expensive – and the slightest distraction can take them away. This app ensures visitors will be steered back to your key conversion goals – even after they have left your site.

Convert more visitors by leaving a tab behind as they navigate your site. Site visitors find this tab after leaving your site - providing a second chance to rescue those leads.

Entice them with reminders, offers, surveys, email subscriptions, or even their shopping cart - the content of this tab is yours to decide.

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