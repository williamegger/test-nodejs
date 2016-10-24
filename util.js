var util = require('util');

var Base = function (age) {
    this.name = 'base';
    this.age = age || 0;
    this.say = function () {
        console.log('Hello Base ', this.age);
    }
}
Base.prototype.showName = function () {
    console.log(this.name);
};


var Sub = function (age) {
    Base.apply(this, arguments);
    this.name = 'sub';
    this.type = 'vip';
};
util.inherits(Sub, Base);

var s = new Sub(8080);
s.say();
s.showName();
console.log(s);

console.log(util.isArray([]));
console.log(util.isArray(new Array()));
var x;
var y = null;
console.log(util.isNull(x));
console.log(util.isUndefined(x));
console.log(util.isNullOrUndefined(x));
console.log(util.isNull(y));
console.log(util.isUndefined(y));
console.log(util.isNullOrUndefined(y));
var s = '100';
var n = 100;
console.log(util.isNumber(s));
console.log(util.isNumber(n));
console.log(util.isString(s));
console.log(util.isString(n));
