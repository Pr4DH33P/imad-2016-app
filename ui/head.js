function loginDisp () {
    var loginDisp = `
        <h5>Logged in</h5>
       
        `;
    document.getElementById('login_disp').innerHTML = commentFormHtml;
  
  
  
  function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loginDisp(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}