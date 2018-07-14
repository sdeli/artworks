var ejs = require('ejs');
var fs = require('fs');

var res = {
    end : function(a){
        console.log(a);
    },
    arr : [],
    writeHead : function(){
        this.arr.push(...arguments)
        console.log(this.arr);
    }
}

respondWithTemplate(res, '../views/about.ejs', {welcome : 'te majom'})

function respondWithTemplate(res, templatePath, opts) {
    res.writeHead(200, 'OK', {contentType : 'text/html'})
    var htmlContent = fs.readFileSync(templatePath, 'utf8');

    var htmlRenderized = ejs.render(htmlContent, opts);
    res.end(htmlRenderized);
}