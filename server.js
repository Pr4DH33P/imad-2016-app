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
  password: 'db-pr4dh33p-52534' ,
  database: 'pr4dh33p',
};

var pages = {
          'page1' : {
            title : 'Page 1' ,
            heading: 'Page One',
            content : ` <p>Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>
            <p>
                Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>
            <p>
                Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>`
         },
          'page2' : {
            title : 'Page 2' ,
            heading: 'Page Two',
            content : ` <p>Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>
            <p>
                Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>`
         },
          'page3' : {
             title : 'Page 3' ,
            heading: 'Page Three',
            content : ` <p>Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
            </p>`
         }
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
                         <a href='/'>Home</a>&nbsp;&nbsp;&nbsp;<a href='/page1'>Bio Data</a>&nbsp;&nbsp;&nbsp;
                        <a href='/page2'>Contact</a>&nbsp;&nbsp;&nbsp;
                        <hr>
                         <h1>
                        ${heading}</h1>
                        <div>
                            ${content}
                        </div>
                        <hr>
                        </div>
                        
                        <div class='footer'>
                         <input type='text' id='cmnt_box' placeholder='Type your comment'> </input>
                         <input type='submit' value='comment' id='cmnt_btn' > </input>
                         <ul id='cmntlist'></ul>
                        </div>
                        </body>
                        </html>`;
        return pageTemplate;
        }

/*var comments = [];
app.get('/comment', function (req, res) {
  var comment = req.query.comment;
  comments.push(comment);
  res.send(JSON.stringify(comments));
});*/

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


/*var names = [];
app.get('/submit-name', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});*/

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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:pageName',function (req, res){
    var pageName = req.params.pageName;
    res.send(createTemplate(pages[pageName]));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
