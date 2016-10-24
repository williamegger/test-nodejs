var path = require('path');

console.log('规范化字符串路径。注意“.”和“..”');
console.log(path.normalize('d:/a/b//c/d'));
console.log(path.normalize('./a/b//c/d'));
console.log(path.normalize('../a/b//c/d'));

console.log('连接路径。注意“.”和“..”');
console.log(path.join('/var/www', '../node', 'upload', 'image', 'logo.png'));

console.log('是否是绝对路径');
console.log(path.isAbsolute('../res'));

console.log('path.resolve(from, to)解析to为绝对路径');
console.log(path.resolve('d:/develop', 'd:/res/images', '..', 'videos'));

console.log('path.relative(from, to)解析to为相对路径');
console.log(path.relative('D:/develop', 'd:/res/images'));

console.log('父级目录名称');
console.log(path.dirname('d:/www/node/image/logo.png'));
console.log(path.dirname('d:/www/node/image/'));
console.log(path.dirname('d:/'));

console.log('目录最后一部分');
console.log(path.basename('d:/www/node/image/'));
console.log(path.basename('d:/www/node/image/logo.png'));
console.log(path.basename('d:/www/node/image/logo.png', '.png'));

console.log('文件扩展名');
console.log(path.extname('/var/image/logo.png'));

console.log('文件分隔符');
console.log(path.sep);

console.log('路径分隔符');
console.log(path.delimiter);

console.log('将字符串转为path对象');
console.log(path.parse(__filename));

console.log('将path对象转为字符串');
console.log(path.format(path.parse(__filename)));