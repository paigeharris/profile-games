
$(() => {
  //onload
 const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
 const $game = $("#game")
 const $scoreboard = $("<table>");
 $game.css({
   width:'800px',
   height:'600px',
   "background-color":"gray",
   overflow:"hidden"
 })
 $game.append($gamebutton);
 $game.append($scoreboard)
 let user = Math.round(0xffffff * Math.random()).toString(16);
 let scores = {}
 scores[user]=0;
 $gamebutton.on("click",() => {

   let color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
   let posx = (Math.random() * ($("#game").width()-$gamebutton.width()));
   let posy = (Math.random() * ($('#game').height()-$gamebutton.height()));
   console.log("PosX: "+posx+"   PosY: "+posy);
   $gamebutton.css({
        'color' : "white",
        'position':'relative',
        'left':posx+'px',
        'top':posy+'px',
        'background-color': color
    }).show().fadeIn(100).delay(1000);
    $gamebutton.show();
    if (scores[user]!=null) {
      scores[user]++;
    }
    else {
      scores[user]=1;
    }

    console.log(scores);
    console.log("My Score: "+scores[user]);
    $scoreboard.empty();
    $scoreboard.append($("<thead>"+"</thead>").append($("<td>"+"User"+"</td>"),$("<td>"+"Score"+"</td>")));
    for (let key in scores) {
      $scoreboard.append($("<tr>").append($("<td>"+key+"</td>"),$("<td>"+scores[key]+"</td>")));
    }

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
     scores=data.scores;
     console.log(data.scores);
     $gamebutton.css({
          'color' : "white",
          'position':'relative',
          'left':data.posx+'px',
          'top':data.posy+'px',
          'background-color': data.color
      }).show().fadeIn(100).delay(1000);
      $gamebutton.show();
      $scoreboard.empty();
      $scoreboard.append($("<thead>"+"</thead>").append($("<td>"+"User"+"</td>"),$("<td>"+"Score"+"</td>")));
      for (let key in scores) {
        $scoreboard.append($("<tr>").append($("<td>"+key+"</td>"),$("<td>"+scores[key]+"</td>")));
      }

 })




  //end onload
})
