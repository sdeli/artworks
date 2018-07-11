function trimmPath(path){
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    return trimmedPath;
}

module.exports = {
    trimmPath
}
