var log = function () {
    var params = new Array();
    for (var i = 0; i < arguments.length; i++) {
        params.push(arguments[i]);
    }
    console.log.apply(this, params);
};

var testGlobalVar = (function () {
    log(__filename);
    log(__dirname);
});

var testTimer = (function () {
    var t1 = setTimeout(function () {
        log('setTimeout() 只执行一次');
        clearTimeout(t1);
    }, 1000);

    var t2count = 0;
    var t2 = setInterval(function () {
        log('setInterval()', t2count);
        if (++t2count == 5) {
            clearInterval(t2);
        }
    }, 1000);
});

var testConsole = (function () {
    console.log('log');
    console.info('info');
    console.warn('warn');
    console.error('error');
    console.dir(console);
    console.trace();
    console.assert(true, 'true输出');
    console.time('labelTimer');
    var total = 0;
    for (var i = 0; i < 100; i++) {
        total += i;
    }
    console.timeEnd('labelTimer');
});

var testProcess = (function () {
    process.on('exit', function (code) {
        setTimeout(function () {
            log('该代码不会执行');
        }, 0);
        log('[exit]', code);
    });
    log(process);
})();