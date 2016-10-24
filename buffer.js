var buf = new Buffer(256);
var len = buf.write('test-nodejs');
console.log(buf.toString('utf8', 0, len));
console.log(len);
console.log(buf.length);

var b1 = new Buffer('123456');
var b2 = new Buffer('ABCDEF');
var b3 = Buffer.concat([b1, b2]);
console.log(b3.toString());

console.log(new Buffer('123').compare(new Buffer('123')));
console.log(new Buffer('123').compare(new Buffer('1234')));
console.log(new Buffer('123').compare(new Buffer('12')));