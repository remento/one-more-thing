//
//  To build PROD:  
//    demos\webpack> npx webpack --config webpack.config.prod.js --display-error-details
//  or, via NPM, as this command is referenced in package.json:
//      npm run-script build-prod
//
//

// const HtmlWebpackPlugin = require('html-webpack-plugin');   // https://github.com/jantimon/html-webpack-plugin#options
const path = require('path');

module.exports = {

    //                        // Mode: @see https://webpack.js.org/concepts/mode/
    //mode: 'development',      // development: Sets process.env.NODE_ENV on DefinePlugin to value development. Enables NamedChunksPlugin and NamedModulesPlugin.
    mode: 'production',    // production: Sets process.env.NODE_ENV on DefinePlugin to value production. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.
    // mode: none/undefined,  // none: Opts out of any default optimization options

    entry: 
        {
            client: './src/client.js'
        },
    output: {
        filename: '[name].bundle-prod.js',
        path: path.resolve(__dirname, 'dist')
    }
};