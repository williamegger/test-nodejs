var fs = require('fs');
var zlib = require('zlib');

// 1.从流中读取数据
{
    var data = '';
    var readStream = fs.createReadStream('input.txt')
    readStream.setEncoding('UTF8');
    readStream.on('data', function (chunk) {
        data += chunk;
    });
    readStream.on('end', function () {
        console.log(data);
        var json = JSON.parse(data);
        console.log(json.title);
        console.log(json.type);
        console.log(json.ucount);
    });
    readStream.on('error', function (err) {
        console.log(err.stack);
    });
}

// 2.写入流
{
    var data1 = '你好NodeJS';
    var writeStream = fs.createWriteStream('output.txt');
    writeStream.write(data1, 'UTF8');
    writeStream.end();
    writeStream.on('finish', function () {
        console.log('文件写入完成');
    });
    writeStream.on('error', function (err) {
        console.log(err.stack);
    });
}

// 3.管道流
{
    var rs = fs.createReadStream('input.txt');
    var ws = fs.createWriteStream('output.txt');
    ws.on('pipe', function (src) {
        console.log('pipe');
    });
    ws.on('unpipe', function (src) {
        console.log('unpipe');
    });
    rs.pipe(ws);
    rs.unpipe(ws);
}

// 4.链式流
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.txt.gz'));

fs.createReadStream('output.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('output.txt.gz.txt'));

console.log('OVER');