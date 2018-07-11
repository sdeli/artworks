/*
 * Title: url parameter parser
 * Description: extracts url paramters and compares the Url path with the route
 *     - a parameter: each string after a / with a :
 *     - at first it checks if url and route are identical, if not returns false
 *     to be identical: 
 *             - number of path-units (path-unit => a string after a / sign until the next one or in case of 
 *             - last path-unit - after the last / sign - until the end of the path) should be identical
 *             - if there are parameters, then all path-units before and after the parameter should be 
 *              identical (in the urlpath and route)
 *             - if there are no url params then all path-untis should be identical
 *     - if there are params in the Urlpath and route and Url path are identical, calls th passed *       the parameters
 *     - if there are no url-params and url and path are identical it calls the callback without parameters
 *     - arguments of urlParameterParser: urlPath, route, callback
 *                
 * Author: Sandor Deli
 * logic: 
 *
 */
let reqUrlPath = 'kicsi/jozsi/about/feco/tacsi/kicsi/okor/tibi';
let route = 'kicsi/jozsi/about/:who2/tacsi/:kicsi/okor/:who3';

let reqUrlPathB = 'kicsi/jozsi/about/feco/tacsi/kicsi/okor/tibi';
let routeB = 'kicsi/jozsi/about/:who2/tacsi/:whoka/okor/:who3';

let reqUrlPathC = 'kicsi/jozsi/about/feco/tacsi/kicsi/okor/tibi/asdasdasd';
let routeC = 'kicsi/jozsi/about/:who2/tacsi/:whoka/okor/:who3';

let paramsObj = urlParameterParser(reqUrlPath, route);
let paramsObjB = urlParameterParser(reqUrlPathB, routeB);
let paramsObjC = urlParameterParser(reqUrlPathC, routeC);
console.log(paramsObj);
console.log(paramsObjB);
console.log(paramsObjC);
function urlParameterParser(reqUrlPath, route){
    let reqUrlPathArr = reqUrlPath.split('/');
    let routeArr = route.split('/');
    let ifPathUnitsLengthMatch = reqUrlPathArr.length === routeArr.length;
    if (!ifPathUnitsLengthMatch) return false;

    let pathVarIndexes = getIndexesOfPathVars(routeArr);
    let doRouteAndReqUrlPathMatch = checkIfRouteAndReqUrlPathMatch(routeArr, pathVarIndexes, reqUrlPathArr);

    if (doRouteAndReqUrlPathMatch && pathVarIndexes.length > 0) {
        let pathVarsObj = getPathVariables(routeArr, pathVarIndexes, reqUrlPathArr)
        return pathVarsObj;
    } else if (doRouteAndUrlPathMatch && pathVarIndexes.length === 0) {
        return true;
    } else {
        return false;
    }
}

function checkIfRouteAndReqUrlPathMatch(routeArr, pathVarIndexes, reqUrlPathArr) {
    for (let i = 0; i < routeArr.length; i++) {
        if (pathVarIndexes.indexOf(i) > -1) continue;

        if (routeArr[i] !== reqUrlPathArr[i]) {
            return false;
        } else {
            // do nothing just check the next item
            // if all item are identical loop finishes and function returns true
        }

        return true;
    };
}

function getIndexesOfPathVars(routeArr) {
    return routeArr.reduce((pathVarIndexes, currPathUnit, currIndex) => {
        if (currPathUnit.indexOf(':') === 0) {
            return [...pathVarIndexes, currIndex]
        }

        return pathVarIndexes;
    }, []);
}

function getPathVariables(routeArr, pathVarIndexes, reqUrlPathArr) {
    let pathVarsObj = {};

    pathVarIndexes.forEach((pathVarIndex) => {
        // in the route Path var is highlighted as :variable so first index need to be extracted
        let pathVarName = routeArr[pathVarIndex].slice(1);
        pathVarsObj[pathVarName] = reqUrlPathArr[pathVarIndex];
    });

    return pathVarsObj;
}