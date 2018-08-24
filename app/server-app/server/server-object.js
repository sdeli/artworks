const router = require('./modules/router/router.js');
const listen = require('./modules/listen/listen.js');

function createServerObj() {
    return {
        listen,
        routeHandler : {
            routesArr : [],
            router,
            ejsGlobals : {}
        },
        route : function (path, callBack) {
            this.routeHandler.routesArr.push({
                path,
                callBack
            });
            console.log(this.routeHandler.routesArr);
        },
        set ejsGlobals(newGlobals) {
            let ejsGlobals = this.routeHandler.ejsGlobals;

            for (key in newGlobals) {
                ejsGlobals[key] = newGlobals[key];
            }
        }
    }
}

module.exports = createServerObj;