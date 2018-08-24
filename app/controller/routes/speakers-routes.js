const {getArtwork} = require('../../model/model-utils/model-utils.js');
const {getArtworks} = require('../../model/model-utils/model-utils.js');
const {getSingleSpeakerInfos} = require('../../model/model-utils/model-utils.js');

function speakersRoutes(server, db) {
    server.route('/speakers', (req, res) => {
        res.writeHead(200, 'OK', {contentType : 'text/html'})

        db.collection('artists').find()
        .toArray()
        .then((docs) => {
            var pageVars = {
                allSpeakers : docs,
                artwork : getArtworks(docs),
                pageTitle : 'Speakers',
                pageID : 'speakerList'
            }

        res.renderFile('../views/speakers.ejs', pageVars);
        }).catch(e => {
            console.log(e);
        })
    });

    server.route('/speakers/:shortname', (req, res) => {
        res.writeHead(200, 'OK', {contentType : 'text/html'})
        let shortname = res.pathVariables.shortname

        db.collection('artists').find()
        .toArray()
        .then((docs) => {
            var pageVars = {
                allSpeakers : docs,
                speaker : getSingleSpeakerInfos(docs, shortname),
                artwork : getArtwork(docs, shortname),
                pageTitle : 'Speaker Info',
                pageID : 'speakerDetail'
            }

            res.renderFile('../views/speakers.ejs', pageVars);
        }).catch(e => {
            console.log(e);
        })
    });
}

module.exports = speakersRoutes;