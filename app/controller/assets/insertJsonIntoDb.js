const feedback = require('./feedback.json');
const artists = require('./speakers.json').feedback;
const {MongoClient} = require('mongodb');

let db;
let artWorksDb = 'art-works';
let dbUrl = `mongodb://localhost:27017/${artWorksDb}`;

let artistsColl = 'artists';
let feedbackColl = 'feedback';

function insertJsonIntoDb(collName, arrOfObjToInsert){
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
       var db = client.db()
        
        db.collection(collName).insertMany(arrOfObjToInsert, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result.ops, undefined, 2));
        }); 
    });
}

insertJsonIntoDb(feedbackColl, feedback);