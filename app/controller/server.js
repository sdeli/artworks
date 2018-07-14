const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const {MongoClient} = require('mongodb');

const {trimmPath} = require('./server-utils/utils.js');
const {respondWithStaticFile} = require('./modules/respond-with-static-file/respond-with-static-file.js');
const {UrlParameterParser} = require('./modules/ulr-parameter-parser/url-parameter-parser.js');
const {respondWithTemplate} = require('./modules/respond-with-template/respond-with-template.js')

const port = 3000;
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
        parsedUrl.path = trimmPath(parsedUrl.path);

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
    let filePath = `${publicFolder}${reqPath}`;
    let ifFileExist = fs.existsSync(filePath);

    if (ifFileExist) {
        respondWithStaticFile(res, filePath);
    } else {
        respondWithStaticFile(res, null, '404');
    }
}

function servePages(res, parsedUrl) {
    let queryStringObj = parsedUrl.query;
    let reqPath = parsedUrl.path;

    let homePagePath = '../views/home.ejs';
    let aboutPagePath = '../views/about.ejs';
    let contactPagePath = '../views/contac.ejs';
    let fourOfourPAgePath = '../views/404.html';

    let urlParameterParser = UrlParameterParser().parse;
    
    urlParameterParser(reqPath, '/', () => {
        respondWithTemplate(res, homePagePath, {welcome : 'welcome on home'});
    });

    urlParameterParser(reqPath, '/about', () => {
        respondWithTemplate(res, aboutPagePath, {welcome : 'welcome on about'});
    });

    urlParameterParser(reqPath, '/contact', () => {
        respondWithTemplate(res, contactPagePath, {welcome : 'welcome on contact'});
    });
    
    urlParameterParser('*', null,  () => {
        respondWithTemplate(res, fourOfourPAgePath);
    });
};
