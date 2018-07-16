const fs = require('fs');
const path = require('path');

const {respondWithStaticFile} = require('./respond-with-static-file/respond-with-static-file.js');
const {UrlParameterParser} = require('././ulr-parameter-parser/url-parameter-parser.js');
urlParameterParser = UrlParameterParser().parse;
const {respondWithTemplate} = require('./respond-with-template/respond-with-template.js');

const publicFolder = '../public/';

function routeHandler(res, parsedUrl) {
    let reqPath = parsedUrl.path;

    if (path.extname(reqPath)) {
        serveStaticFiles(res, reqPath);
    } else {
        servePages.call(this, res, parsedUrl);
    }
}

function serveStaticFiles(res, reqPath) {
    let filePath = `${publicFolder}${reqPath}`;
    let ifFileExist = fs.existsSync(filePath);

    if (ifFileExist) {
        respondWithStaticFile(res, filePath);
    } else {
        let fourOfourPagePath = '../views/404.html';
        respondWithStaticFile(res, fourOfourPagePath, {
            contentType : 'text/html',
            statusCode : 404
        });
    }
}

function servePages(res, parsedUrl, db) {
    let queryStringObj = parsedUrl.query;
    let reqPath = parsedUrl.path;

    this.routesArr.forEach((route) => {
       let pathVariables = urlParameterParser(reqPath, route.path);

       if (pathVariables) {
            route.callBack(res, pathVariables)
       }
    });
};

module.exports = routeHandler;