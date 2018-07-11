const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const {MongoClient} = require('mongodb');

const port = 3000;
const {respondWithFile} = require('./modules/respond-with-file.js')
const {trimmPath} = require('./server-utils/utils.js');

const publicFolder = '../public';

let collection = 'artWorkUsers';
let dbUrl = `mongodb://localhost:27017/${collection}`;
let db;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db('TodoApp');

    startServer();   
});

function startServer() {
    http.createServer((req, res) => {
        let parsedUrl = url.parse(req.url, true)
        parsedUrl.pathname = trimmPath(parsedUrl.pathname);
        
        routeHandler(res, parsedUrl);
    }).listen(port);
};

function routeHandler(res, parsedUrl) {
    let reqPath = parsedUrl.pathname;

    if (path.extname(reqPath)) {
        serveStaticFiles(res, reqPath);
    } else {
        servePages(res, parsedUrl);
    }
}

function serveStaticFiles(res, reqPath) {
    // check if file exist
    let filePath = `${publicFolder}${reqPath}`;
    let ifFileExist = fs.existsSync(filePath);

    if (ifFileExist) {
        respondWithFile(res, filePath);
    } else {
        respondWithFile(res, null, '404');
    }
}

function servePages(res, parsedUrl) {
    let queryStringObj = parsedUrl.query;
    let reqPath = parsedUrl.pathname;

    let homePagePath = '../views/home.ejs';
    let aboutPagePath = '../views/about.ejs';
    let contactPagePath = '../views/contac.ejs';

    if (reqPath === '/') {
        respondWithFile(res, homePagePath, {contentType : 'text/html'});
    } else if (reqPath === '/about') {
        respondWithFile(res, aboutPagePath, {contentType : 'text/html'});
    } else if (reqPath === '/contact') {
        respondWithFile(res, contactPagePath, {contentType : 'text/html'});
    } else {
        respondWithFile(res, null, '404');
    }
};
