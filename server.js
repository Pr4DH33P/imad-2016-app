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
                            <meta name="theme-color" content="#2196F3" />
                           <link href="/ui/style.css" rel="stylesheet" />
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
                        </head>
                        <body>
                       <div class="w3-container w3-blue">
                       <div id="myModal" class="modal">
                        <div class="modal-content">
                        <div class="modal-header">
                        <span class="close">&times</span>
                        <h2>Menu</h2>
                        </div>
                        <div class="modal-body">
                         <section class="flat"><p  style="padding: 2% 10%;"><a href='/m/index'><button>Home</button></a></p>
                            <p  style="padding: 2% 10%;"><a href='/Profile'><button>Profile</button></a></p>
                            <p  style="padding: 2% 10%;"><a href='/Contact'><button>Contact</button></a></p>
                            <p  style="padding: 2% 10%;"><a href='/WebApp'><button>Sign Up</button></a></p>
                            <p  style="padding: 2% 10%;"><a href='/'><button>Regular Version</button></a></p></section>    
                        </div></div></div> 
                        <div class="top">
                        <div align='left' >
                        <input type="image" id="myBtn" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" width= initial position= fixed margin-left= 1% class=menu /></div> 
                        <h3 align=center>${heading}</h3>
                        </div> </div>
                        <div class='container'>${content}
                                     <strong>  <h3>Comments</h3> </strong> 
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
                        </div>
                        
                    
                        </div>
                        <script>
                        var modal = document.getElementById('myModal');
                        var btn = document.getElementById("myBtn");
                        var span = document.getElementsByClassName("close")[0];
                        btn.onclick = function() {
                        modal.style.display = "block";
                        }
                        span.onclick = function() {
                        modal.style.display = "none";
                        }   
                        window.onclick = function(event) {
                        if (event.target == modal) {
                        modal.style.display = "none";
                        }  
                        }
                        </script>
                        <script type="text/javascript" src="/ui/head.js"></script>
                        </body>
                        </html>`;
        return pageTemplate;
        }
        




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'abtme.html'));
});

app.get('/ui/main.js', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/head.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'head.js'));
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
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(200).send('User successfully created: ' + username);
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







app.get('/get-comments/:pageName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query(`SELECT comment.*, "user".username FROM page, comment, "user" WHERE page.Title =$1 AND page.pid = comment.article_id AND comment.user_id = "user".id`, [req.params.pageName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:pageName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from page where title = $1', [req.params.pageName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Page not found');
                } else {
                    var pageId = result.rows[0].pid;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id, timestamp) VALUES ($1, $2, $3, now())",
                        [req.body.comment, pageId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});


app.get('/ui/img/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', req.params.fileName));
});


app.get('/m/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/img/114.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', '114.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});