var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var onRequest = function (req, resp) {
    var reqUrl = url.parse(req.url);
    if (req.method == 'GET') {
        doGet(req, resp);
    } else if (req.method == 'POST') {
        doPost(req, resp);
    }

    resp.writeHead(200, {'Content-Type': 'text/plain'});
    resp.end(util.inspect(reqUrl, true));
};

var doGet = function (req, resp) {
    var reqUrl = url.parse(req.url);
    console.log(querystring.parse(reqUrl.query));
};
var doPost = function (req, resp) {
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        var post = querystring.parse(data);
        console.log(post);
    })
};

http.createServer(onRequest).listen(8888, '127.0.0.1', function () {
    console.log('Server Running...')
});

