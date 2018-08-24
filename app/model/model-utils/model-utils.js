/*const {MongoClient} = require('mongodb');
const {ObjectID} = require('mongodb');

const port = 3000;
const dbName = 'art-works';
const dbUrl = `mongodb://localhost:27017/${dbName}`;
let db;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) throw err;

    db = client.db();
    let artistsColl = db.collection('artists').find().toArray();
    let feedbackColl = db.collection('feedback').find().toArray();

    Promise.all([artistsColl, feedbackColl])
    .then((docs) => {
        attachTimeStampsToFeedbacksArr(docs[1])
    }).catch(e => {
        console.log(e);
    })
});*/

function getArtworks(docs) {
    let artworksArr = docs.reduce((accumulator, currSpeaker) => {
        return [...accumulator, ...currSpeaker.artwork];
    }, []);

    return artworksArr;
}

function getSingleSpeakerInfos(docs, shortname) {
    let singleSpeakersInfos = docs.find(speakerObj => speakerObj.shortname === shortname);
    return singleSpeakersInfos;
}

function getArtwork(docs, shortname) {
    let singleSpeakersInfos = getSingleSpeakerInfos(docs, shortname);
    return singleSpeakersInfos.artwork;
}

function attachTimeStampsToFeedbacksArr(feedbacksArr) {
    console.log(feedbacksArr);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    feedbacksArr.forEach((item, i) => {
        let timeStamp = new Date(feedbacksArr[i]._id.getTimestamp());

        feedbacksArr[i].timeStamp = timeStamp.getHours() + ' O`clock - ';
        feedbacksArr[i].timeStamp += timeStamp.getDate() + ' ';
        feedbacksArr[i].timeStamp += monthNames[timeStamp.getMonth()] + ' ';
        feedbacksArr[i].timeStamp += timeStamp.getFullYear() + ' ';
    });
}

function arrio(ar){
    debugger;
    console.log(ar);
}

module.exports = {
    getArtworks,
    getSingleSpeakerInfos,
    getArtwork,
    attachTimeStampsToFeedbacksArr
}