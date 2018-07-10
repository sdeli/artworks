const feedback = require('./feedback.json');
const artists = require('./speakers.json');

let db;
let aritistsCollection = 'artists';
let dbUrl = `mongodb://localhost:27017/${collection}`;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db('TodoApp');

    startServer();   
});

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db('TodoApp');

    startServer();   
});