const config = {
    'hostname': '127.0.0.1',
    'port': 8888
};

var http = require('http');

var server = http.createServer(function (req, resp) {
    var url = req.url;
    console.log('url=', url);

    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'text/plain');

    if (url == '/') {
        resp.end('Hello NodeJS');
    } else if (url == '/users') {
        resp.end('users');
    } else {
        resp.end('Hello NodeJS');
    }

});

server.listen(config.port, config.hostname, function () {
    console.log('Server running as http://' + config.hostname + ':' + config.port);
});

