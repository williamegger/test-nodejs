var dns = require('dns');


console.log('返回DNS服务器数组');
console.log(dns.getServers());

console.log('解析域名');
dns.lookup('www.baidu.com', function (err, address, family) {
    console.log('返回第一个解析到的地址');
    if (err) {
        console.log(err);
        return;
    }
    console.log(address);
    console.log(family);// 4=IP4, 6=IP6
});
dns.lookup('www.baidu.com', {all: true}, function (err, address, family) {
    console.log('返回所有解析到的地址');
    if (err) {
        console.log(err);
        return;
    }
    console.log(address);
    console.log(family);// 4=IP4, 6=IP6
});

/**
 * dns.resolve(domain, [rrtype], callback)
 *
 * rrtype:
 * 'A'（IPv4 地址，缺省）
 * 'AAAA'（IPv6 地址）
 * 'MX'（邮件交换记录）
 * 'TXT'（文本记录）
 * 'SRV'（SRV 记录）
 * 'PTR'（用于 IP 反向查找）
 * 'NS'（域名服务器记录）
 * 'CNAME'（别名记录）
 */
dns.resolve('www.baidu.com', 'A', function (err, addresses) {
    console.log('resolve:按照rrtype类型解析域名');
    if (err) {
        console.log(err);
        return;
    }
    console.log(addresses);
});

dns.reverse('182.254.140.140', function (err, hostnames) {
    console.log('reverse:反相解析IP');
    if (err) {
        console.log(err);
        return;
    }
    console.log(hostnames);
});