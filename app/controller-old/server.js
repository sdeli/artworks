const http = require('http');
const url = require('url');
const {MongoClient} = require('mongodb');

const {trimmPath} = require('./server-utils/utils.js');
const routeHandler = require('./modules/router/router.js');
var x = 5;
const port = 3000;

let dbName = 'art-works';
let dbUrl = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;
    db = client.db();
    
    startServer(db).listen(3000);   
});

function startServer(db) {
    return http.createServer((req, res) => {
        let parsedUrl = url.parse(req.url, true)
        parsedUrl.path = trimmPath(parsedUrl.path);
        routeHandler(res, parsedUrl, db);
    })
};