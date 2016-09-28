var button = document.getElementById('counter');
button.onclick = function() {
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200 )
          {
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
  };
  request.open('GET', 'http://pr4dh33p.imad.hasura-app.io/counter' , true);
  request.send(null);
};



var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    var request = new XMLHttpRequest();
  
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200 )
          {
           var names = request.responseText;
           names = JSON.parse(names);
    var list = '';
    for(var i=0;i<names.length;i++){
        list += '<li>' + names[i] + '</li>';
    }

    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
          }
      }
  };
  var nameInput = document.getElementById('name');
  var name = nameInput.value;
  request.open('GET', 'http://pr4dh33p.imad.hasura-app.io/submit-name?name=' + name , true);
  request.send(null);
};


var subcomment = document.getElementById('cmnt_btn');
subcomment.onclick = function () {
    
    var request = new XMLHttpRequest();
  
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200 )
          {
           var comments = request.responseText;
           comments = JSON.parse(comments);
    var disp = '';
    for(var i=0;i<comments.length;i++){
        disp += '<li>' + comments[i] + '</li>';
    }

    var ul = document.getElementById('cmntlist');
    ul.innerHTML = disp;
          }
      }
  };
  var cmntInput = document.getElementById('cmnt_box');
  var cmnt = cmntInput.value;
  request.open('GET', 'http://pr4dh33p.imad.hasura-app.io/comment?cmnt=' + cmnt , true);
  request.send(null);
};
