const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html lang="ko">');
    res.write('<head><title>Ted Jin 520</title></head>');
    res.write('<body><h1>This is Node Server Page</h1></body>');
    res.write('</html>');
    res.end('Ted, it\'s ok');
    // process.exit();
});

server.listen(4000);
