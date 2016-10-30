var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));
var config = {
  host: 'db.imad.hasura-app.io',
  port: '5432',
  user: 'pr4dh33p',
  password: process.env.DB_PASSWORD,
  database: 'pr4dh33p',
};
      function createTemplate (data) {
            var title = data.title;
            var heading = data.heading;
            var content = data.content;
            var pageTemplate = 
                        `<html>
                        <head>
                        <title>${title}</title>
                           <meta name="viewport" content="width-device-width, initial-scale=1" />
                           <link href="/ui/style.css" rel="stylesheet" />
                        </head>
                        <body>
                        <div class="container">
                        <hr><section class="flat">
                           <a href='/'><button>Home</button></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='/Profile'><button>Profile</button></a>&nbsp;&nbsp;&nbsp;
                           <a href='/Contact'><button>Contact</button></a>&nbsp;&nbsp;&nbsp;<a href='/App/WebApp'><button>WebApp</button></a>&nbsp;&nbsp;&nbsp;&nbsp;</section><hr>
                        <h1>${heading}</h1>
                        <div>${content}</div>
                        <hr>
                        </div>
                        <!-- <div class='footer'>
                           <input type='text' id='cmnt_box' placeholder='Type your comment'> </input>
                           <input type='submit' value='comment' id='cmnt_btn' > </input>
                           <ul id='cmntlist'></ul>
                        </div> -->
                        </body>
                        </html>`;
        return pageTemplate;
        }
        

/*var comments = [];
app.get('/comment', function (req, res) {
  var comment = req.query.comment;
  comments.push(comment);
  res.send(JSON.stringify(comments));
});
var pool = new Pool(config);
app.get('/db', function (req, res) {
    pool.query('SELECT * FROM user_data', function (err,result) {
      if (err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result));
      }
  });
});
*/
var names = [];
app.get('/submit/name', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

var ages = [];
app.get('/submit/age', function (req, res) {
  var age = req.query.age;
  ages.push(age);
  res.send(JSON.stringify(ages));
});

var emails = [];
app.get('/submit/email', function (req, res) {
  var email = req.query.email;
  emails.push(email);
  res.send(JSON.stringify(emails));
});


/*var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/App/WebApp', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'app.html'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var pool = new Pool(config);
app.get('/:pageName',function (req, res){
    pool.query("SELECT * FROM page where Title =$1" , [req.params.pageName] , function(err,result){
         if (err){
         res.status(500).send(err.toString());
         }
      else{
          if(result.rows.length === 0){
          res.status(404).send('404! Page not found!');    
          }
             else{
              var pageData= result.rows[0];
              res.send(createTemplate(pageData));}}
    });
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});