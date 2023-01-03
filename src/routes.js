const fs = require('fs');

const requestHandler = (req, res) => {
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
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                console.log('async end call()');
                return res.end();
            });

        })
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html lang="ko">');
        res.write('<head><title>Ted Jin 520</title></head>');
        res.write('<body><h1>This is Node Server Page</h1></body>');
        res.write('</html>');
        res.end('Ted, it\'s ok');
        console.log('res end call()');
    }
}

module.exports = requestHandler;