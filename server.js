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
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30},
    resave: true,
    saveUninitialized: true
}));

      function createTemplate (data) {
            var title = data.title;
            var heading = data.heading;
            var content = data.content;
            var link = data.link;
            var pageTemplate = 
                        `<html>
                        <head>
                        <title>${title}</title>
                           <meta name="viewport" content="width-device-width, initial-scale=1" />
                           <link href="/ui/style.css" rel="stylesheet" />
                        </head>
                        <body>
                        
                        
                       
                       
                       <div id="myModal" class="modal">
       <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times</span>
      <h2>Menu</h2>
      </div>
      <div class="modal-body">
       <!--<div style="background-color:#aaa;height: 100%;width: 30%;float:left;margin-left: -2%;position: absolute;margin-top: -1.3%;">-->
         <section class="flat"><ul>
            <li><a href='/'><button>Home</button></a></li>
            <li><a href='/Profile'><button>Profile</button></a></li>
            <li><a href='/Contact'><button>Contact</button></a></li>
            <li><a href='/WebApp'><button>WebApp</button></a></li>
         </ul></section>
        </div></div></div>
        
        <div class="top">
            <div align='left' >
            <input type="image" id="myBtn" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" width= 4% height= 5% position= fixed margin-left= 1% class=menu /></div> 
            <h3 align=center>${heading}</h3>

        </div>
        <div class='horizontalrule1'><hr>
        </div> 
                       
                       
        
                        
                        
                        
                        
                        <div class='container'>${content}</div>
                        
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/head.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'head.html'));
});


function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});



app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var pool = new Pool(config);
var sub = function () {
    pool.query('INSERT INTO "user" (name, age, email) VALUES ($1, $2, $3)', [name,age,email], function(err,result){
         if (err){
          res.status(500).send(err.toString());
      }
      else{
          res.send('Username'+name);
      }
    });
 };
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