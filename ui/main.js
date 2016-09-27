console.log('Loaded!');
var img = document.getElementById('img');
var marginLeft =0;
function moveright(){
  marginLeft = marginLeft + 0.5;
   img.style.marginLeft= marginLeft + 'px' ;
}
img.onclick = function() {
    var interval = setInterval(moveright,50);
};