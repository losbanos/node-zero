const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html lang="ko">');
        res.write('<head><title>Ted Jin 520 Send Message</title></head>');
        res.write('<body><h1>Send Message</h1>');
        res.write('<form action="/message" method="post"><input type="text" name="message" /><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    const body = [];
    if (url === '/message' && method === 'POST') {
        req.on('data', chunk => {
            body.push(chunk);
            console.log('chunk = ', chunk);
        })
        req.on('end', chunk => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);

        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html lang="ko">');
    res.write('<head><title>Ted Jin 520</title></head>');
    res.write('<body><h1>This is Node Server Page</h1></body>');
    res.write('</html>');
    res.end('Ted, it\'s ok');
    // process.exit();
});

server.listen(4000);
