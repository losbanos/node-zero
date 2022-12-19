const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Ted, it\'s ok');
});

server.listen(4000);
