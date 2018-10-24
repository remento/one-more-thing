//
// Create a node-static server instance to serve the './dist' folder
// @see https://www.npmjs.com/package/node-static
//
// ..demos\webpack> npm start
//      ...aka...
// ..demos\webpack> node local_server.js

var port = 8080;
var static = require('node-static');
var file = new static.Server('./dist', { cache: 0 });

require('http')
    .createServer(function (request, response) {
        request.addListener('end', function () {
            // Serve files!
            file.serve(request, response);
        }).resume();
    }).listen(port);
console.log('Server: http://localhost:' + port);