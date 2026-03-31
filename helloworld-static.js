'use strict';

const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('500 - Internal Error');
        } else {
            res.statusCode = responseCode;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    // normalize url by removing querystring, optional
    // trailing slash, and making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    if (path === '') {
        serveStaticFile(res, '/public/index.html', 'text/html');
    } else if (path === '/') {
        serveStaticFile(res, '/public/index.html', 'text/html');
    } else if(path === '/about') {
        serveStaticFile(res, '/public/about.html', 'text/html');
    } else if(path === '/logo') {
        serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
    } else {
        serveStaticFile(res, path, 'text/plain');
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});