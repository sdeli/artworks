const cheerio = require('cheerio')
var {assert} = require('chai');
const rewire = require("rewire");
const sinon = require("sinon");
var request = require('request');

/*
res.headers.content-type
res.statusCode
res.body
*/
const testedDomain = 'http://localhost';
const port = '3000';

const templateTestCases = [
    {
        path : '/generate404',
        body : {
            sel : 'h1',
            innerText : 'So Sorry 404' 
        }
    },
    {
        path : '/about',
        body : {
            sel : 'h1',
            innerText : 'About us' 
        }
    },
    {
        path : '/contact',
        body : {
            sel : 'h1',
            innerText : 'Contact' 
        }
    },
    {
        path : '/',
        body : {
            sel : 'h1',
            innerText : 'home' 
        }
    }
]

function getRequestToServerJs(i, path) {
    return new Promise(resolve => {
        request(`${testedDomain}:${port}${path}`, function (err, res, body) {
            resolve(res)
        });
    })
}

describe('getRequestToServerJs()', function() {
    function shouldRespondWithCorrectPage(i){
        it('should respond with corect file', function(done) {
            let currPath = templateTestCases[i].path

            getRequestToServerJs(i, currPath)
            .then(res => {
                assert.equal(res['headers']['content-type'], 'text/html')
                debugger;
                let $ = cheerio.load(res.body);
                let expectedInnerText = templateTestCases[i].body.innerText;
                let currInnerText = $(templateTestCases[i].body.sel).html();

                assert.equal(currInnerText, expectedInnerText, `${res.req.path}`)
                done();
            })
        });
    }
    
    for(let i = 0; i < templateTestCases.length; i++){
        shouldRespondWithCorrectPage(i);
    }
});
