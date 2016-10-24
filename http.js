var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var UploadHandler = function (contentType, data) {
    var _this = this;
    this.params = {};
    this.files = [];

    var _req_contentType = contentType || '';
    var _req_data = data || '';
    var _boundary = '';

    var _parseContentType = function () {
        if (_req_contentType == '') {
            return;
        }
        var types = _req_contentType.split(';');
        for (var i = 0; i < types.length; i++) {
            var arr = types[i].trim().split('=');
            if (arr[0] == 'boundary') {
                _boundary = arr[1];
            }
        }
    };
    var _parseReqData = function () {
        if (_boundary == '') {
            return;
        }
        var _data = _req_data.toString().trim();
        if (_data == '') {
            return;
        }
        // 删除头行、尾行
        var startIndex = _data.indexOf('\r\n') + 2;
        var endIndex = _data.lastIndexOf('\r\n');
        _data = _data.substring(startIndex, endIndex);
        // 根据分节符分割字符串
        var parts = _data.split('\r\n--' + _boundary + '\r\n');
        if (parts.length == 0) {
            return;
        }
        // 解析数据
        for (var i = 0; i < parts.length; i++) {
            _parseData(parts[i])
        }
    };
    var _parseData = function (data) {
        var index = data.indexOf('\r\n\r\n');
        var partHead = data.substring(0, index);
        var partData = data.substring(index + 4);

        var part = {};
        var headArr = partHead.replace('\r\n', ';').split(';');
        for (var i = 0; i < headArr.length; i++) {
            var head = headArr[i];
            var headsplit = (head.indexOf(':') > 0) ? ':' : '=';
            var arr = head.split(headsplit);
            part[arr[0].trim().toLowerCase()] = arr[1].trim().replace(/["']/g, '');
        }
        part.data = partData;
        part.length = partData.length;

        if (part.filename) {
            if (part.filename != '') {
                _this.files.push(part);
            }
        } else if (part.name) {
            var arr = [];
            if (_this.params[part.name]) {
                arr = _this.params[part.name];
            }
            arr.push(part.data);
            _this.params[part.name] = arr;
        }
    }

    _parseContentType();
    _parseReqData();
};

var doGet = function (req, resp, reqUrl) {
    var params = querystring.parse(reqUrl.query);
    console.log(params);

    resp.writeHead(200, {'Content-Type': 'text/plain'});
    resp.end('Hello doGet');
};
var doPost = function (req, resp, reqUrl) {
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    }).on('end', function () {
        console.log(querystring.parse(data.toString()));
        resp.writeHead(200, {'Content-Type': 'text/plain'});
        resp.end('Hello doPost');
    });
};
var doUpload = function (req, resp, reqUrl) {
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    }).on('end', function () {
        var upload = new UploadHandler(req.headers['content-type'], data.toString().trim());
        console.log(upload.params);
        console.log(upload.files);

        if (upload.files.length > 0) {
            for (var i = 0; i < upload.files.length; i++) {
                var f = upload.files[i];

                var dir = 'd:/zUpload/';
                var filepath = dir + f.filename;

                fs.mkdir(dir, function () {
                    fs.writeFile(filepath, f.data, function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('文件保存成功')
                        fs.readFile(filepath, function (err, data) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(data.toString());
                        });
                    });
                })

            }
        }

        resp.writeHead(200, {'Content-Type': 'text/plain'});
        resp.end('Hello doUpload');
    });
};


http.createServer(function (req, resp) {
    req.setEncoding('utf8');
    console.log(req.headers);
    var reqUrl = url.parse(req.url);
    console.log(reqUrl.pathname);

    var method = req.method;
    if (method == 'GET') {
        doGet(req, resp, reqUrl);
    } else if (method == 'POST') {
        if (req.headers['content-type'] && new RegExp('^multipart', 'i').test(req.headers['content-type'])) {
            doUpload(req, resp, reqUrl);
        } else {
            doPost(req, resp, reqUrl);
        }
    }
}).listen(8888, '127.0.0.1', function () {
    console.log('Server Running...');
});