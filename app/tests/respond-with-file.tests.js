const fs = require('fs');
const path = require('path');
const rewire = require("rewire");
const sinon = require("sinon");

const respondWithFile = rewire('../controller/modules/respond-with-file.js');


const pathTo404Page = '../../views/404.html';

let result = {
    passing : 0,
    failing: 0,
    failingTests : []
}


function callTests(){
    shouldResoultValidContenttype();
    shouldResoultValidContenttype_2();
    shouldResoultValidContenttype_3();
    shouldResoultValidContenttype_4();
    shouldResoultValidContenttype_5();
    respondWithFileTest_1();
    printResults();
}

function printResults() {
    console.log('RESULTS: *************************');
    console.log(`@ ${result.passing} tests are passing`)
    console.log(`# ${result.failing} tests are failing`)

    if (result.failingTests.length) {
        console.log('Failing Tests:');
        console.log(result.failingTests);
    }
}

function ifTrueMsg(testId, fn){
    console.log(`Test ID: ${testId}\n@PASSED: ${fn.name}`);
    console.log('---------------------------------');
}

function shouldResoultValidContenttype() {
    let testId = 1;

    try {
        let contentType = respondWithFile.getContentType('/advert.jpg');   

        if (contentType === 'image/jpg') {
            ifTrueMsg(testId, shouldResoultValidContenttype);
            result.passing++;
        } else {
            ifFalseMsg(contentType);
            result.failing++;
            result.failingTests.push(testId);
        }        
    } catch(e) {
        console.log('error in shouldResoultValidContenttype: ' + e);
    }

    function ifFalseMsg(contentType){
        console.log(`${testId}#FAILED: shouldResoultValidContenttype`);
        console.log('     ' + 'contentType !== image/jpg');
        console.log('     ' + 'headingOneInnerText:');
        console.log('     ' + contentType);
        console.log('---------------------------------');
    }
}

function shouldResoultValidContenttype_2() {
    let testId = 2;

    try {
        let contentType = respondWithFile.getContentType('/advert.png');   

        if (contentType === 'image/png') {
            ifTrueMsg(testId, shouldResoultValidContenttype_2);
            result.passing++;
        } else {
            ifFalseMsg(contentType);
            result.failing++;
            result.failingTests.push(testId);
        }        
    } catch(e) {
        console.log('error in shouldResoultValidContenttype_2: ' + e);
    }

    function ifFalseMsg(contentType){
        console.log(`Test ID: ${testId}\n#FAILED: shouldResoultValidContenttype_2`);
        console.log('     ' + 'contentType !== image/png');
        console.log('     ' + 'contentType:');
        console.log('     ' + contentType);
        console.log('---------------------------------');
    }
}

function shouldResoultValidContenttype_3() {
    let testId = 3;

    try {
        let contentType = respondWithFile.getContentType('/advert.json');   

        if (contentType === 'application/json') {
            ifTrueMsg(testId, shouldResoultValidContenttype_3);
            result.passing++;
        } else {
            ifFalseMsg(contentType);
            result.failing++;
            result.failingTests.push(testId);
        }        
    } catch(e) {
        console.log('error in shouldResoultValidContenttype_3: ' + e);
    }

    function ifFalseMsg(contentType){
        console.log(`Test ID: ${testId}\n#FAILED: shouldResoultValidContenttype_3`);
        console.log('     ' + 'contentType !== application/json');
        console.log('     ' + 'contentType:');
        console.log('     ' + contentType);
        console.log('---------------------------------');
    }
}

function shouldResoultValidContenttype_4() {
    let testId = 4;

    try {
        let contentType = respondWithFile.getContentType('/advert.js');   

        if (contentType === 'text/javascript') {
            ifTrueMsg(testId, shouldResoultValidContenttype_4);
            result.passing++;
        } else {
            ifFalseMsg(contentType);
            result.failing++;
            result.failingTests.push(testId);
        }        
    } catch(e) {
        console.log('error in shouldResoultValidContenttype_4: ' + e);
    }

    function ifFalseMsg(contentType){
        console.log(`Test ID: ${testId}\n#FAILED: shouldResoultValidContenttype_4`);
        console.log('     ' + 'contentType !== text/javascript');
        console.log('     ' + 'contentType:');
        console.log('     ' + contentType);
        console.log('---------------------------------');
    }
}

function shouldResoultValidContenttype_5() {
    let testId = 5;

    try {
        let contentType = respondWithFile.getContentType('/advert.gif');   

        if (contentType === 'image/gif') {
            ifTrueMsg(testId, shouldResoultValidContenttype_5);
            result.passing++;
        } else {
            ifFalseMsg(contentType);
            result.failing++;
            result.failingTests.push(testId);
        }        
    } catch(e) {
        console.log('error in shouldResoultValidContenttype_5: ' + e);
    }

    function ifFalseMsg(contentType){
        console.log(`Test ID: ${testId}\n#FAILED: shouldResoultValidContenttype_5`);
        console.log('     ' + 'contentType !== image/gif');
        console.log('     ' + 'contentType:');
        console.log('     ' + contentType);
        console.log('---------------------------------');
    }
};

let sendFile = sinon.spy();
let res = {
    writeHead : sinon.spy()
}
respondWithFile.__set__('sendFile', sendFile);

function respondWithFileTest_1() {
    let testId = 6;

    try {
        let FilePathTest = '/about.js';
        let statusCodeTest = 200;
        let contentTypeTest ='text/javascript';

        respondWithFile.respondWithFile(res, FilePathTest, {});

        var wasCalled = sendFile.callCount > 0;

        let args = sendFile.args[0];
        var isFilePathCorrect = args[1] === FilePathTest;

        let writeHeadArgs = args[0].writeHead.args[0];
        var isStatusCodeCorrect = writeHeadArgs[0] === statusCodeTest;
        var isContentTypeCorrect = writeHeadArgs[1]['Content-Type'] === contentTypeTest;

        if (wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect) {
            ifTrueMsg(testId, respondWithFileTest_1);
            result.passing++;
        } else {
            ifFalseMsg(sendFile.args[0][1], sendFile.callCount);
            result.failing++;
            result.failingTests.push(testId);
        }

    } catch(e) {
        console.log('error in respondWithFileTest_1: ' + e);
    }

    function ifFalseMsg(badArg, callCount){
        console.log(`Test ID: ${testId}\n#FAILED: respondWithFileTest_1`);
        console.log('     ' + 'condition: wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect => failed');
        console.log('     ' + `wasCalled: ${wasCalled}, isFilePathCorrect: ${isFilePathCorrect}, isStatusCodeCorrect: ${isStatusCodeCorrect}, isContentTypeCorrect: ${isContentTypeCorrect}`);
        console.log('---------------------------------');
    }
};

function respondWithFileTest_1() {
    let testId = 7;

    try {
        let FilePathTest = '/about.png';
        let statusCodeTest = 200;
        let contentTypeTest ='image/png';

        respondWithFile.respondWithFile(res, FilePathTest, {});

        var wasCalled = sendFile.callCount > 0;

        let args = sendFile.args[0];
        var isFilePathCorrect = args[1] === FilePathTest;

        let writeHeadArgs = args[0].writeHead.args[0];
        var isStatusCodeCorrect = writeHeadArgs[0] === statusCodeTest;
        var isContentTypeCorrect = writeHeadArgs[1]['Content-Type'] === contentTypeTest;

        if (wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect) {
            ifTrueMsg(testId, respondWithFileTest_1);
            result.passing++;
        } else {
            ifFalseMsg(sendFile.args[0][1], sendFile.callCount);
            result.failing++;
            result.failingTests.push(testId);
        }

    } catch(e) {
        console.log('error in respondWithFileTest_1: ' + e);
    }

    function ifFalseMsg(badArg, callCount){
        console.log(`Test ID: ${testId}\n#FAILED: respondWithFileTest_1`);
        console.log('     ' + 'condition: wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect => failed');
        console.log('     ' + `wasCalled: ${wasCalled}, isFilePathCorrect: ${isFilePathCorrect}, isStatusCodeCorrect: ${isStatusCodeCorrect}, isContentTypeCorrect: ${isContentTypeCorrect}`);
        console.log('---------------------------------');
    }
};

function respondWithFileTest_1() {
    let testId = 8;

    try {
        let FilePathTest = '/about.jpg';
        let statusCodeTest = 200;
        let contentTypeTest ='image/jpg';

        respondWithFile.respondWithFile(res, FilePathTest, {});

        var wasCalled = sendFile.callCount > 0;

        let args = sendFile.args[0];
        var isFilePathCorrect = args[1] === FilePathTest;

        let writeHeadArgs = args[0].writeHead.args[0];
        var isStatusCodeCorrect = writeHeadArgs[0] === statusCodeTest;
        var isContentTypeCorrect = writeHeadArgs[1]['Content-Type'] === contentTypeTest;

        if (wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect) {
            ifTrueMsg(testId, respondWithFileTest_1);
            result.passing++;
        } else {
            ifFalseMsg(sendFile.args[0][1], sendFile.callCount);
            result.failing++;
            result.failingTests.push(testId);
        }
    } catch(e) {
        console.log('error in respondWithFileTest_1: ' + e);
    }

    function ifFalseMsg(badArg, callCount){
        console.log(`Test ID: ${testId}\n#FAILED: respondWithFileTest_1`);
        console.log('     ' + 'condition: wasCalled && isFilePathCorrect && isStatusCodeCorrect && isContentTypeCorrect => failed');
        console.log('     ' + `wasCalled: ${wasCalled}, isFilePathCorrect: ${isFilePathCorrect}, isStatusCodeCorrect: ${isStatusCodeCorrect}, isContentTypeCorrect: ${isContentTypeCorrect}`);
        console.log('---------------------------------');
    }
};
    /*let homePagePath = '../views/home.ejs';
    let aboutPagePath = '../views/about.ejs';
    let contactPagePath = '../views/contac.ejs';*/
callTests();