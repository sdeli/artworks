function trimmPath(path){
    if (path !== '') {
        var trimmedPath = path.replace(/^\/+|\/+$/g, '');
        return trimmedPath;
    } else {
        return path;
    }
}

module.exports = {
    trimmPath
}
