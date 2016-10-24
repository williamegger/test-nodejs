var http = require('http');
var url = require('url');

var onRequest = function (req, resp) {
    var reqUrl = url.parse(req.url);
    console.log(reqUrl);

    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'text/plain');
    resp.end('Hello URL module');
};
http.createServer(onRequest).listen(8888, '127.0.0.1', function () {
    console.log('Server Running...');
});

