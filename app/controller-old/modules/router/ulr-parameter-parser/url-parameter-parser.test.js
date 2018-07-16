var {assert} = require('chai');
const rewire = require("rewire");

const {UrlParameterParser} = require('./url-parameter-parser.js');

var testCases = [
    //[0]:reqUrlPath, [1]:route, [2]:pass test value
    ['/', '/', {}],
    ['/', '/about', false],
    ['/', '/contact', false],
    ['/', '*', false],
    ['/about', '/', false],
    ['/about', '/about', {}],
    ['/about', '/contact', false],
    ['/about', '*', false],
    ['/contact', '/', false],
    ['/contact', '/about', false],
    ['/contact', '/contact', {}],
    ['/contact', '/contact', {}],
    ['/contact', '*', false],
    ['/trigger-404', '/', false],
    ['/trigger-404', '/about', false],
    ['/trigger-404', '/contact', false],
    ['/trigger-404', '*', false]
]

describe('FUNCTION: url-paramter-parser module', function() {
    for (let i = 0; i < testCases.length; i++) {
        it('compares path of request with curr route and if match returns path vars in Obj, else false ', function() {
            let sinon = require("sinon");
            let callback = sinon.spy();
            let reqUrlPath = testCases[i][0];
            let route = testCases[i][1];
            let expectedOutput = testCases[i][2];

            UrlParameterParser().parse(reqUrlPath, route, callback);

            if (expectedOutput === false) {
                assert.equal(callback.callCount, 0, `#1 ${i} ${callback.callCount} ${expectedOutput}`)
            } else {
                assert.equal(callback.callCount, 1, `#2 ${i} ${callback.callCount} ${expectedOutput}`)
            }

            callback.resetHistory();
        })
    }
});

 