const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

let post = {
    data: '',
    add(chunk) {
        this.data += chunk;
    },
    getData() {
        serverTime = (new Date()).toString().replace(/(\sGMT).*$/g, '')
        _result = JSON.stringify({...querystring.parse(this.data), serverTime});
        this.data = '';
        return _result;
    }
};

const server = http.createServer();

server.on('request', (req, res) => {
    req.on('data', chunk => post.add(chunk));
    req.on('end', () => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead('200');
        res.write(post.getData());
        res.end();
    });
});

server.listen('3000', '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});

//
// cb = (err, data) => {
//     if (err) throw err;
//     console.log(data);
// };
// ap = data => {
//     fs.appendFile('Y:/www/ws/ajax/test.txt',`\r\n${data}`, err => {
//         if (err) throw err;
//         fs.readFile('Y:/www/ws/ajax/test.txt' , 'utf8' , cb);
//     });
// };
// ap('new line');
// console.log('before');

// let a = [1, 2, 3, 4, 5];
// let a = new Array(100000).fill(1)
// function f(arr) {
//     let id = arr.shift();
//     if (!id) return false;
//     console.log('go');
//     f(arr);
// }
