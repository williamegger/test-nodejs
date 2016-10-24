var hello = require('./module/user');

hello.showTime();
console.log(hello.getTime());

var user = new hello();
user.setName('aaa');
console.log(user.getName());

console.log('OVER');