'use strict';

function User() {
    this.name = '';
    this.age = 0;
};
module.exports = User;

User.prototype.getName = function () {
    return this.name;
};
User.prototype.setName = function (name) {
    this.name = name;
    return this;
};
User.prototype.getAge = function () {
    return this.age;
};
User.prototype.setAge = function (age) {
    this.age = age;
    return this;
};

User.showTime = function () {
    console.log(User.getTime());
};
User.getTime = function () {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    h = h >= 10 ? h : '0' + h;
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;
    return h + ':' + m + ':' + s;
};
