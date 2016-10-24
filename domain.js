var EventEmitter = require('events').EventEmitter;
var domain = require('domain');

var emitter1 = new EventEmitter();
emitter1.on('error', function (err) {
    console.log('emitter1:', err.message);
});
var emitter2 = new EventEmitter();
emitter2.on('error', function (err) {
    console.log('emitter2:', err.message);
});

// 显示绑定
var domain1 = domain.create();
domain1.add(emitter1);
domain1.add(emitter2);
domain1.on('error', function (err) {
    console.log('domain1:', err.message);
});
emitter1.emit('error', new Error('Emitter1 Error, emitter1拦截'));
emitter2.emit('error', new Error('Emitter2 Error, emitter2拦截'));
emitter1.removeAllListeners('error');
emitter1.emit('error', new Error('Emitter1 Error, domain1拦截'));

// 隐式绑定
var domain2 = domain.create();
domain2.on('error', function (err) {
    console.log('domain2:', err.message);
});
domain2.run(function () {
    var emitter3 = new EventEmitter();
    emitter3.emit('error', new Error('Emitter3 Error, domain2拦截'));
});


// 由process.on('uncaughtException')来拦截其他捕获的异常
process.on('uncaughtException', function (err) {
    console.log('process:', err.message);
});
domain1.remove(emitter1);
emitter1.emit('error', new Error('Emitter1 Error, process拦截'));

var timer = setTimeout(function () {
    console.log('未捕获异常会退出程序，我不会被执行！！！');
    clearTimeout(timer);
}, 1);