const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url + '.html');
    let extname = (filepath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filepath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'content-Type': contentType });
                    res.end(content, 'utf-8');
                })
            } else {

                res.writeHead(500);
                res.end(`Server-Error: ${err - code}`);
            }
        } else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(content, 'utf-8');
        }
    });

});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));