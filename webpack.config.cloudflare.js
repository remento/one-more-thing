//
//  To build:  
//    demos\webpack> npx webpack --config webpack.config.cloudflare.js --display-error-details
//  or, via NPM, as this command is referenced in package.json:
//      npm run-script build-dev
//
//  Note: webpack.config.js is the default configuration file name, so no need to specify --config webpack.config.js
//

//const HtmlWebpackPlugin = require('html-webpack-plugin');   // https://github.com/jantimon/html-webpack-plugin#options
const path = require('path');

module.exports = {

    //                        // Mode: @see https://webpack.js.org/concepts/mode/
    mode: 'development',      // development: Sets process.env.NODE_ENV on DefinePlugin to value development. Enables NamedChunksPlugin and NamedModulesPlugin.
    // mode: 'production',    // production: Sets process.env.NODE_ENV on DefinePlugin to value production. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.
    // mode: none/undefined,  // none: Opts out of any default optimization options

    entry: //'./src/index.js',
        {
            app: './src/cloudflare-app.js'
        },

    output: {
        filename: '[name].bundle-dev.js',
        path: path.resolve(__dirname, 'dist-cloudflare')
    }
   
};