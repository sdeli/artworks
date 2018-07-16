const router = require('./modules/router/router.js');
const listen = require('./modules/listen/listen.js');

function createServerObj() {
    return {
        listen,
        globalVars : [],
        routeHandler : {
            routesArr : [],
            router,
        },
        route : function (path, callBack) {
            this.routeHandler.routesArr.push({
                path,
                callBack
            });
        },
        setLocal : ''
    }
}

module.exports = createServerObj;