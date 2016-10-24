var net = require('net');

// Socket Client
var doClient = function () {
    var client = net.connect({'port': 9999, 'host': '192.168.0.2'}, function () {
        console.log('C -> 连接到服务器！');
        client.write('c1');
    });
    client.on('data', function (data) {
        console.log('C -> 接受数据：', data.toString());
        if ('s1' == data.toString()) {
            client.write('c2');
            client.end();
        }
    });
    client.on('end', function () {
        console.log('C -> 客户端关闭');
    });
};


// Socket Server
var server = net.createServer(function (conn) {
    console.log('S -> 客户端连接');
    conn.write('s1');
    conn.on('end', function () {
        console.log('S -> 客户端关闭');
        server.close();
    });
    conn.on('data', function (data) {
        console.log('S -> 接受数据：', data.toString());
    });
    //conn.pipe(conn);
});


// Test
server.listen(9999, '192.168.0.2', function () {
    console.log('Socket Server Running...');
    doClient();
});