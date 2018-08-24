const {attachTimeStampsToFeedbacksArr} = require('../../model/model-utils/model-utils.js');

function feedBackRoutes(server ,db) {
    server.route('/feedback', (req, res) => {
        res.writeHead(200, 'OK', {contentType : 'text/html'})

        let artistsColl = db.collection('artists').find().toArray();
        let feedbackColl = db.collection('feedback').find().toArray();

        Promise.all([artistsColl, feedbackColl])
        .then((docs) => {
            attachTimeStampsToFeedbacksArr(docs[1]);
            
            let pageVars = {
                allSpeakers : docs[0],
                feedbacks : docs[1].reverse(),
                pageTitle : 'Feedback',
                pageID : 'feedback'
            }

            res.renderFile('../views/feedback.ejs', pageVars);
        }).catch(e => {
            console.log(e);
        })
    });

    server.route('/submitted-feedback', (req, res) => {
        let feedBackDataJson = '';

        req.on('data', (chunk) => {
            feedBackDataJson += chunk;
        })

        req.on('end', () => {
            feedbackDataObj = JSON.parse(feedBackDataJson);

            db.collection('feedback')
            .insertOne(feedbackDataObj).then(result => {
                res.writeHead(204, 'OK', {contentType : 'text/plain'});
                res.end();
            }).catch(e => {
                console.log(e);
                res.writeHead(501, {contentType : 'text/plain'});
                res.end('there was some problem with the post');
            })
        })
    });
}

module.exports = feedBackRoutes;