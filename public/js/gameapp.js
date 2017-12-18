console.log($);
$(() => {
  //onload
 const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
 const $game = $("#game")
 $game.append($gamebutton);
 $gamebutton.on("click",() => {
   $gamebutton.hide();
   var buttonsize = ((Math.random()*100) + 50).toFixed();
   var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
   var posx = (Math.random() * ($(document).width() - buttonsize)).toFixed();
   var posy = (Math.random() * ($(document).height() - buttonsize)).toFixed();
   $gamebutton.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'background-color': color
    }).show().fadeIn(100).delay(1000);
    $gamebutton.show();

 });





  //end onload
})
