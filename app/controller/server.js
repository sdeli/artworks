const {MongoClient} = require('mongodb');
const ejs = require('ejs');

const serverApp = require('../server-app/server-singleton.js');
const {getArtworks} = require('../model/model-utils/model-utils.js');
const {getArtwork} = require('../model/model-utils/model-utils.js');
const {getSingleSpeakerInfos} = require('../model/model-utils/model-utils.js');

const feedBackRoutes = require('./routes/feedback-routes.js');
const homeRoute = require('./routes/home-route.js');
const speakersRoutes = require('./routes/speakers-routes.js');

const port = 3500;
const dbName = 'art-works';
const dbUrl = `mongodb://localhost:27017/${dbName}`;
let db;

var server = serverApp.getServer();

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db();
    server.ejsGlobals = {
        siteTitle : 'Roux Meetups'
    }

    server.listen(port);
    
    homeRoute(server, db);
    speakersRoutes(server, db);
    feedBackRoutes(server, db);
});