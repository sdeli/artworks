/*
 * Title: sending template files
 * Description: this module is responsible for rendereing and sending ejs files
 * Author: Sandor Deli
 * logic: 
 *
 */

const ejs = require('ejs');

function respondWithTemplate(res, templatePath, opts) {
    res.writeHead(200, 'OK', {contentType : 'text/html'})

    ejs.renderFile(templatePath, opts, (err, html) => {
        if (err) console.log(err);
        res.write(html);
        res.end();
    })
}

module.exports = {
    respondWithTemplate
}
