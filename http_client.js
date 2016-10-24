var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('util');
var fs = require('fs');
var path = require('path');

setTimeout(function () {
    //testGet();
    //testPost();
    testUpload();
}, 1);

var testGet = function () {
    console.log('testGet');
    var postData = querystring.stringify({
        'name': '张',
        'type': 'test GET'
    });

    var req = http.get('http://www.baidu.com?' + postData, function (resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            console.log('接受的数据：', chunk.toString());
        }).on('end', function () {
            console.log('数据接受完毕');
        });
    });
    req.on('error', function (err) {
        console.log('http.get() Error,', err.message);
    });
    req.end();
};

var testPost = function () {
    console.log('testPost');
    var postData = querystring.stringify({
        'name': '张',
        'type': 'test POST'
    });
    var opts = {
        'host': '127.0.0.1',
        'port': 8888,
        'path': '/testPOST',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    var req = http.request(opts, function (resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            console.log('接受的数据：', chunk.toString());
        });
        resp.on('end', function () {
            console.log('数据接受完毕');
        });
    });
    req.on('error', function (err) {
        console.log(err);
    });
    req.write(postData)
    req.end();
};

var testUpload = function () {
    console.log('testUpload');
    var boundary = '---------------------------6686390573788478321';

    var params = {
        'name': '张三',
        'follow': ['NBA', 'Movie', 'IT']
    };
    var filepaths = ['d:/文本.txt'];

    var opts = {
        'host': '127.0.0.1',
        'port': 8888,
        'path': '/upload',
        'method': 'POST',
        'headers': {
            'Content-Type': 'multipart/form-data; boundary=' + boundary
        }
    };
    var req = http.request(opts, function (resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            console.log('接受的数据：', chunk.toString());
        });
        resp.on('end', function () {
            console.log('数据接受完毕');
        });
    });
    req.on('error', function (err) {
        console.log(err);
    });
    req.write(buildUploadData(boundary, params, filepaths));
    req.end();
};

function buildUploadData(boundary, params, filepaths) {
    var bLine = '\r\n--' + boundary + '\r\n';
    var endLine = '\r\n--' + boundary + '--\r\n';
    var data = '';

    if (params) {
        var value, pHead;
        for (var name in params) {
            pHead = '';
            pHead += bLine;
            pHead += 'Content-Disposition: form-data; name="' + name + '"\r\n';
            pHead += 'Content-Type: text/plant; charset=UTF-8\r\n\r\n';

            value = params[name];
            if (util.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    data += pHead;
                    data += value[i];
                }
            } else {
                data += pHead;
                data += value;
            }
        }
    }
    if (filepaths) {
        var fHead;
        for (var i = 0; i < filepaths.length; i++) {
            var filepath = filepaths[i];
            fHead = '';
            fHead += bLine;
            fHead += 'Content-Disposition: form-data; name="myFile' + i + '"; filename="' + path.basename(filepath) + '"\r\n\r\n';

            var fData = fs.readFileSync(filepath);
            data += fHead;
            data += fData;
        }
    }
    data += endLine;

    return data;
}