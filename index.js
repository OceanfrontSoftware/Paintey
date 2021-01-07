var static = require('node-static');
var http = require('http');

var staticFolder = __dirname + "_static";
console.log(staticFolder);
var file = new(static.Server)(staticFolder);

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8080)