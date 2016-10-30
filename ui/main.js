var usrname = document.getElementById('usrname').value;
var email = document.getElementById('email').value;
var age = document.getElementById('age').value;
var password = document.getElementById('password').value;
var submit_btn = document.getElementById('submit_btn');
var form = document.getElementById("form");
document.getElementById("submit_btn").addEventListener("click", function () {
  form.submit();
  alert("$name");
    
});