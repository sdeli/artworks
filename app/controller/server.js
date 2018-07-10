const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const feedback = require('./assets/feedback.json');
const artists = require('./assets/speakers.json');
console.log(JSON.stringify(feedback, undefined, 2));
console.log('-----------------');
console.log(JSON.stringify(artists, undefined, 2));
//const {MongoClient} = require('mongodb');
const port = 3000;
const {respondWithFile, sendFile} = require('./server-utils/utils.js')

const publicFolder = '../public';

/*let collection = 'artWorkUsers';
let dbUrl = `mongodb://localhost:27017/${collection}`;
let db;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db('TodoApp');

    startServer();   
});*/

function startServer() {
    http.createServer((req, res) => {
        let reqPath = url.parse(req.url).pathname

        routeHandler(res, reqPath);
    }).listen(port);
};

function routeHandler(res, reqPath) {
    if (path.extname(reqPath)) {
        serveStaticFiles(res, reqPath);
    } else {
        servePages(res, reqPath);
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

function servePages(res, reqPath) {
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

startServer();
// send files fn
// serve static files
// serve queries
// routeHandler