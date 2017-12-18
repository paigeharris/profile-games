
$(() => {
  //onload
 const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
 const $game = $("#game")
 $game.css({
   width:'800px',
   height:'600px',
   "background-color":"gray",
   overflow:"hidden"
 })
 $game.append($gamebutton);
 let scores = {player1:0,player2:0}
 $gamebutton.on("click",() => {

   let color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
   let posx = (Math.random() * ($("#game").width())+$game.position().left-($gamebutton.width()/2));
   let posy = (Math.random() * ($('#game').height())+$game.position().top-$gamebutton.height());
   console.log("PosX: "+posx+"   PosY: "+posy);
   $gamebutton.css({
        'color' : "white",
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'background-color': color
    }).show().fadeIn(100).delay(1000);
    $gamebutton.show();
    scores.player1++;
    console.log(scores);

   socket.emit('myClick', {
     color: color,
     posx:posx,
     posy:posy,
     scores:scores


   });
 });
 console.log($);
 var socket = io();
   socket.connect();
   socket.on('myClick', function (data) {
     data.scores.player2++;
     scores=data.scores;
     console.log(data.scores);
     $gamebutton.css({
          'color' : "white",
          'position':'absolute',
          'left':data.posx+'px',
          'top':data.posy+'px',
          'background-color': data.color
      }).show().fadeIn(100).delay(1000);
      $gamebutton.show();


 })




  //end onload
})
