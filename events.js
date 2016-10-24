var events = require('events');
var eventEmitter = new events.EventEmitter();

// 全局事件
eventEmitter.on('removeListener', function (event, listener) {
    console.log(event, '事件[移除]监听');
});
eventEmitter.on('newListener', function (event, listener) {
    console.log(event, '事件[添加]监听');
});


var listener1 = function (arg1, arg2) {
    console.log('listener1 : ', arg1, arg2);
};
var listener2 = function (arg1, arg2) {
    console.log('listener2 : ', arg1, arg2);
};
eventEmitter.on('conn', listener1);
eventEmitter.on('conn', listener2);

console.log('conn listener count : ', events.EventEmitter.listenerCount(eventEmitter, 'conn'));
eventEmitter.emit('conn', '参数1', '参数2');