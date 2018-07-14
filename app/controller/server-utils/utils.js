const fs = require('fs');

function trimmPath(path){
    if (path !== '' && path !== '/') {
        var trimmedPath = path.replace(/^\/+|\/+$/g, '');
        return trimmedPath;
    } else if (path === ''){
        return '/';
    } else if(path === '/'){
        return path;
    }
}


function getFilesFromFolder(dirPath) {
    if (!dirPath) return false;
    var dirPathContentArr = fs.readdirSync(dirPath);

    dirPathContentArr.forEach((fileName, i) => {
        dirPathContentArr[i] = `${dirPath}/${fileName}`;
    }); 

    return dirPathContentArr;
}

module.exports = {
    trimmPath,
    getFilesFromFolder
}
