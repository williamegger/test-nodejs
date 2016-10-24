var fs = require('fs');

fs.readFile('./input.txt', function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('异步读取文件', data.toString());
});

var syncData = fs.readFileSync('./input.txt');
console.log('同步读取文件', syncData.toString());

fs.stat('./input.txt', function (err, stats) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stats);
    console.log('isFile : ', stats.isFile());
    console.log('isDirectory : ', stats.isDirectory());
});

fs.writeFile('./output.txt', 'this is output.txt', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    var data = fs.readFileSync('./output.txt');
    console.log('output.txt : ', data.toString());
});

fs.appendFile('./output.txt', '\r\nthis is output.txt', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    var data = fs.readFileSync('./output.txt');
    console.log('output.txt : ', data.toString());
});


fs.access('./out/output.txt', function (err) {
    if (err) {
        console.log('文件不存在');
    }
});
fs.access('./out/output.txt', fs.F_OK | fs.R_OK | fs.W_OK, function (err) {
    if (err) {
        console.log(err);
    }
});
fs.realpath('./output.txt', function (err, path) {
    if (err) {
        console.log(err);
    } else {
        console.log(path);
    }
});

fs.mkdir('./out', function (err) {
    if (err) {
        console.log('mkdir', err);
    } else {
        console.log('mkdir [ok]');
    }
    fs.rmdir('./out', function (err) {
        if (err) {
            console.log('rmdir', err);
        } else {
            console.log('rmdir [ok]');
        }
    });
});