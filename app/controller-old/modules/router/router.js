const fs = require('fs');
const path = require('path');

const {respondWithStaticFile} = require('./respond-with-static-file/respond-with-static-file.js');
const {UrlParameterParser} = require('././ulr-parameter-parser/url-parameter-parser.js');
urlParameterParser = UrlParameterParser().parse;
const {respondWithTemplate} = require('./respond-with-template/respond-with-template.js');

const publicFolder = '../public/';

function routeHandler(res, parsedUrl, db) {
    let reqPath = parsedUrl.path;

    if (path.extname(reqPath)) {
        serveStaticFiles(res, reqPath);
    } else {
        servePages(res, parsedUrl, db);
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

    let homePagePath = '../views/index.ejs';
    let speakerPagePath = '../views/speakers.ejs';
    let feedbackPagePath = '../views/feedback.ejs';
    let fourOfourPagePath = '../views/404.html';
    let chatTemplatePath = '../views/chat.ejs';
    
    urlParameterParser(reqPath, '/', () => {
        db.collection('artists').find().toArray()
        .then((docs) => {
            console.log(Array.isArray(docs));
            docs.forEach( function(item, index) {
                console.log(item.shortname);
                console.log(item.name);
            });
            respondWithTemplate(res, homePagePath, {
                siteTitle : 'welcome on home',
                pageTitle : 'majom',
                pageID : 'home',
                allSpeakers : docs
            });
        }).catch(e => {
            console.log(e);
        })
    });

    urlParameterParser(reqPath, '/speaker', () => {
        respondWithTemplate(res, speakerPagePath, {welcome : 'welcome on about'});
    });

    urlParameterParser(reqPath, '/feedback', () => {
        respondWithTemplate(res, feedbackPagePath, {welcome : 'welcome on contact'});
    });

    urlParameterParser(reqPath, '/chat', () => {
        respondWithTemplate(res, chatTemplatePath, {
            pageTitle : 'faszom',
            siteTitle : 'ideoda',
            pageID : 'majom'
        });
    });
    
    urlParameterParser('*', null,  () => {
        respondWithTemplate(res, fourOfourPagePath);
    });
};

module.exports = routeHandler;