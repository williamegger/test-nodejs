var child_process = require('child_process');
var iconvlite = require('iconv-lite');

var workProcess;
if (process.platform == 'win32') {
    workProcess = child_process.spawn('cmd.exe', ['/s', '/c', 'dir']);
} else {
    workProcess = child_process.spawn('sh', ['-c', 'dir']);
}
workProcess.stdout.on('data', function (data) {
    console.log('stdout.on("data") ===========================');
    console.log(iconvlite.decode(data, 'cp936'));
});
workProcess.stderr.on('data', function (data) {
    console.log('stderr.on("data") ===========================');
    console.log(iconvlite.decode(data, 'cp936'));
});
workProcess.on('error', function (err) {
    console.log('error:', err);
});
workProcess.on('close', function (code) {
    console.log('close:', code);
});

child_process.exec('dir', {'timeout': 10 * 1000}, function (err, stdout, stderr) {
    console.log('exec: ======================================');
    if (err) {
        console.log(err);
        return;
    }

    console.log('stdout:', iconvlite.decode(stdout, 'cp936'));
    console.log('stderr:', iconvlite.decode(stderr, 'cp936'));
});
