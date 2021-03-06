var currentPageTitle = window.location.pathname.split('/')[1];

function loadCommentForm () {
    var commentFormHtml = `
        <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Write your Comment</label>
        <textarea id="comment_text" rows="4" cols="80" class="form-control" placeholder="Enter your comment here..." required>
        </textarea>
        </div>
        </div>
        <br/>
        <input type="submit" class="su" id="submit1" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    

    var submit1 = document.getElementById('submit1');
    submit1.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit1.value = 'Submit';
          }
        };
        
       
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentPageTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit1.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
     
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p><strong>${escapeHTML(commentsData[i].comment)}</strong></p>
                        <div class="commenter">
                          ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                        <hr>
                    </div>
                       `;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentPageTitle, true);
    request.send(null);
}



loadLogin();
loadComments();