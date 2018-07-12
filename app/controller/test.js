const http = require('http');
const {respondWithFile} = require('./modules/respond-with-file.js');
let homePagePath = '../views/home.ejs';

function startServer() {
    http.createServer((req, res) => {
        respondWithFile(res, null, '404');
    }).listen(3000);
};

startServer();