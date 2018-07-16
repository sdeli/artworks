const {MongoClient} = require('mongodb');
const ejs = require('ejs');

const serverApp = require('../server-app/server-singleton.js');

const port = 3000;
const dbName = 'art-works';
const dbUrl = `mongodb://localhost:27017/${dbName}`;
let db;

var server = serverApp.getServer();

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;
    db = client.db();
    
    server.listen(port);
});


server.route('/', (res) => {
    db.collection('artists').find().toArray()
    .then((docs) => {
        res.writeHead(200, 'OK', {contentType : 'text/html'})
        respondWithTemplate(res, '../views/index.ejs', {
            siteTitle : 'welcome on home',
            pageTitle : 'majom',
            pageID : 'home',
            allSpeakers : docs
        })
    }).catch(e => {
        console.log(e);
    })
});

function respondWithTemplate(res, templatePath, opts) {

    ejs.renderFile(templatePath, opts, (err, html) => {
        if (err) console.log(err);
        console.log(html);
        res.write(html);
        res.end();
    })
}