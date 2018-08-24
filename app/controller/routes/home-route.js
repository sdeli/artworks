const {getArtworks} = require('../../model/model-utils/model-utils.js');

function homeRoute(server, db) {
    server.route('/', (req, res) => {
        res.writeHead(200, 'OK', {contentType : 'text/html'})

        db.collection('artists').find()
        .toArray()
        .then((docs) => {
            var pageVars = {
                allSpeakers : docs,
                artwork : getArtworks(docs),
                pageTitle : 'Home',
                pageID : 'home'
            }

        res.renderFile('../views/index.ejs', pageVars);
        }).catch(e => {
            console.log(e);
        })
    }); 
}

module.exports = homeRoute;