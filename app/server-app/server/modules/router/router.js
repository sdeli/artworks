const fs = require('fs');
const path = require('path');

const {respondWithStaticFile} = require('./respond-with-static-file/respond-with-static-file.js');
const {urlParameterParser} = require('././ulr-parameter-parser/url-parameter-parser.js');
const getExtendedRes = require('./extend-response-obj/get-extended-response-object.js');

const publicFolder = '../public/';

function routeHandler(req, res, parsedUrl) {
    let reqPath = parsedUrl.path;

    if (path.extname(reqPath)) {
        serveStaticFiles(res, reqPath);
    } else {
        servePages.call(this, req, res, parsedUrl);
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

function servePages(req, res, parsedUrl) {
    let queryStringObj = parsedUrl.query;
    let reqPath = parsedUrl.path;
    let routesArrLength = this.routesArr.length;

    for (let i = 0; i < routesArrLength; i++) {
        let route = this.routesArr[i];
        let pathVariables = urlParameterParser(reqPath, route.path);
        
        if (pathVariables) {
            let extendedResponseObj = getExtendedRes(res, queryStringObj, pathVariables, this.ejsGlobals);
            route.callBack(req, extendedResponseObj);
        }
    }
};

module.exports = routeHandler;