var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
                        ${title}
                        <meta name="viewport" content="width-device-width, initial-scale=1" />
                        <link href="/ui/style.css" rel="stylesheet" />
                        </head>
                        <body>
                        <div class="container">
                        <div>
                            <a href="/">Home</a>
                            <hr/>
                        </div><h1>
                        ${heading}</h1>
                        <div>
                            ${content}
                        </div>
                        </div>
                        </body>
                        </html>`;
        return pageTemplate;
        }

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:pageName',function (req, res){
    var pageName = req.params.pageName;
    res.send(createTemplate(pages[pageName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
