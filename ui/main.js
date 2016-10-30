var usrname = document.getElementById('usrname').value;
var email = document.getElementById('email').value;
var age = document.getElementById('age').value;
var password = document.getElementById('password').value;
var submit_btn = document.getElementById('submit_btn');
submit_btn.onclick = function () {
    pool.query(`INSERT INTO "user" ("name", "age", "email") VALUES ('asfgsdfg', '54', 'sfsdfgf');`);
 };