//
//  To build:  
//    demos\webpack> npx webpack --config webpack.config.js --display-error-details
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
            client: './src/client.js'
        },

    output: [{
        filename: '[name].bundle-dev.js',
        path: path.resolve(__dirname, 'dist')
    }]
    // plugins: [new HtmlWebpackPlugin({
    //     title: 'one-more-thing',
    //     inject: 'body',                                       // true || 'head' || 'body' || false:  Inject all assets into the given template or templateContent. When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element
    //     favicon: './src/oa-icon-logo.png',
    //     //template: '!!handlebars!src/index.hbs', // handlebars template // set loader directly for this template, @see https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
    //     // meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}            // Allows to inject meta-tags. E.g. meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    //     // filename	{String}	'index.html'	The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html)
    //     // template	{String}	``	webpack require path to the template. Please see the docs for details
    //     // templateParameters	{Boolean|Object|Function}	``	Allows to overwrite the parameters used in the template
    //     // minify: {Boolean|Object}  // 	true if mode is 'production', otherwise false
    //     // hash: {Boolean} // false: If true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting
    //     // cache	{Boolean}	true	Emit the file only if it was changed
    //     // showErrors	{Boolean}	true	Errors details will be written into the HTML page
    //     // chunks	{?}	?	Allows you to add only some chunks (e.g only the unit-test chunk)
    //     // chunksSortMode	{String|Function}	auto	Allows to control how chunks should be sorted before they are included to the HTML. Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
    //     // excludeChunks	{Array.<string>}	``	Allows you to skip some chunks (e.g don't add the unit-test chunk)
    //     // xhtml	{Boolean}	false	If true render the link tags as self-closing (XHTML compliant)
    // })]
};