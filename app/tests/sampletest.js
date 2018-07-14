//let {getFilesInPublicFolder} = require('../controller/server-utils/utils.js');
let http = require('http');
let {respondWithFile} = require('../controller/modules/respond-with-file/respond-with-file.js');
//console.log(getFilesInPublicFolder());
http.createServer((req, res) => {
    respondWithFile(res, null, '404');
}).listen(2000);