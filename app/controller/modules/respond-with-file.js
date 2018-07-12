const fs = require('fs');
const path = require('path');

const pathTo404Page = '../../views/404.html';

function respondWithFile(res, filePath, options) {
    if (options !== '404') {
        options = options || {};
        let statusCode = options.statusCode || 200;
        let contentType = options.contentType || getContentType(filePath);

        res.writeHead(statusCode, {'Content-Type' : contentType});
        sendFile(res, filePath);
    } else {
        res.writeHead(404, {'Content-Type' : 'text/html'})
        sendFile(res, pathTo404Page);
    }
}

function getContentType(filePath) {
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    return contentType;
}

function sendFile(res, filePath) {
    let reader = fs.createReadStream(filePath);

    reader.on('error', () => {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1>404\nThere Has been an issue with the file pleasse check with your site admin</h1>');
    });

    reader.pipe(res);
    res.on('finsh', () => {
        res.end();
    });
}

module.exports = {
    respondWithFile,
    getContentType,
    sendFile
}