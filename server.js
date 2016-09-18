var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var page1 = {
    title : "Page 1",
    heading: "Page One",
    content : ` <p>Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
        </p>
        <p>
            Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
        </p>
        <p>
            Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.Content of my first page.
        </p>`
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
    </div>
    ${heading}
    <div>
        ${content}
    </div>
    </div>
</body>
</html>`
    return pageTemplate;
}

app.get('/', function (req, res) {
  res.send(createTemplate(page1));
});

app.get('/page1',function (req, res){
     res.sendFile(path.join(__dirname, 'ui', 'page1.html'));
    
});

app.get('/page2',function (req, res){
   res.sendFile(path.join(__dirname, 'ui', 'page2.html'));
    
});

app.get('/page3',function (req, res){
   res.sendFile(path.join(__dirname, 'ui', 'page3.html'));
    
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
