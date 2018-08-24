(function() {
    let feedbackSubmitBtn = document.querySelector('.feedback-form .btn');
    let feedbackNameField = document.querySelector('#feedback-form-name'); 
    let feedbackTitleField = document.querySelector('#feedback-form-title'); 
    let feedbackMessageField = document.querySelector('#feedback-form-message');
    let feedbackMessagesDiv = document.querySelector('.feedback-messages');
    
    feedbackSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        let feedbackDetailsJson = JSON.stringify({
            name : feedbackNameField.value,
            title : feedbackTitleField.value,
            message : feedbackMessageField.value
        });


        postFeedback(feedbackDetailsJson)
    });

    function postFeedback(feedbackDetailsJson) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/submitted-feedback", true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 204) {
                console.log(feedbackDetailsJson);
                clearFormFields([feedbackNameField, feedbackTitleField, feedbackMessageField, feedbackMessagesDiv]);

                insertNewPost(JSON.parse(feedbackDetailsJson));
           }
        };
        
        xhttp.send(feedbackDetailsJson);
    }

    function insertNewPost(feedBackDetailsObj) {
        let {name, title, message, timeStamp} = feedBackDetailsObj;
        timeStamp = timeStamp || 'now';

        let newFeedBacksDiv = document.createElement('div');
        newFeedBacksDiv.className = 'feedback-item item-list media-list'
        newFeedBacksDiv.innerHTML = (
            `<div class="feedback-item media">` +
            `<div class="feedback-head">` +
            `<div class="feedback-title">` +
            `<p class="feedback-timestamp">${timeStamp}</p>` +
                `<p>${title}<small class="feedback-name label label-info">${name}</small></p>` +
            `</div>` +
            `</div>` +
            `<div class="feedback-message">${message}</div>` +
            `</div>`
        )

        feedbackMessagesDiv.insertBefore(newFeedBacksDiv, feedbackMessagesDiv.children[0]);                   
    }

    function clearFormFields(formFieldsArr) {
        formFieldsArr.forEach(formField => {
            formField.value = '';
        });
    }
}());
