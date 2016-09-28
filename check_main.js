var button = document.getElementById('counter');
button.onclick = function() {
  var request = new XMLHttpRequest();
  
  request.onReadyStateChange = function() {
      if(request.readyState === XMLHttpRequest.Done)
      {
          if(request.Status === 200 )
          {
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
  };
  request.open('GET','http://pr4dh33p.imad.hasura-app.io/counter',true);
  request.send(null);
};
