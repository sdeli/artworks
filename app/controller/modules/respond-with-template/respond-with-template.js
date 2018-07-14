/*
 * Title: sending template files
 * Description: this module is responsible for rendereing and sending ejs files
 * Author: Sandor Deli
 * logic: 
 *
 */

const ejs = require('ejs');
const fs = require('fs');

function respondWithTemplate(res, templatePath, opts) {
    res.writeHead(200, 'OK', {contentType : 'text/html'})
    var htmlContent = fs.readFileSync(templatePath, 'utf8');

    var htmlRenderized = ejs.render(htmlContent, opts);
    res.end(htmlRenderized);
}

module.exports = {
    respondWithTemplate
}
