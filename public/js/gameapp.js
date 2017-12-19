console.log(app);
app.controller("GameController", ["$http", function($http) {


}]); //end GameController
var socket = io();
socket.connect();

let newuser =true;
let user ="";
$(() => {
  //onload
  const $livechat = $("<form>")
  const $chat = $("<div>")
  const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
  const $game = $("#game")
  const $scoreboard = $("<table>");
  const $startgame = $("<button>"+"Join Game"+"</button>").click((e) => {
    socket.emit("newUser",{});
    $(this).hide();
    $gamebutton.show();
  })

  let $typed = $("<input type='text' placeholder='LiveChat Here'>")
  $livechat.append($typed);
  $livechat.append( $("<input type='submit' value='Go'>"));
  $livechat.submit(() => {

    $chat.append($("<h2>"+$typed.val()+"</h2>"))
    socket.emit('newChat', {
      chat:$typed.val()
    });
    $typed.val("");
  });
  $game.css({
    width:'800px',
    height:'600px',
    "background-color":"gray",
    overflow:"hidden"
  })
  $game.append($startgame)
  $game.append($gamebutton.hide());
  $game.append($livechat);
  $game.append($scoreboard);
  $game.append($chat);
  let scores = {}
  $gamebutton.on("click",() => {
    function getPosition(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    let posx = getPosition($game.position().left,$("#game").width()-$gamebutton.width());
    let posy = getPosition($game.position().top,$("#game").height()-$gamebutton.height());
    console.log("PosX: "+posx+"   PosY: "+posy);
    $gamebutton.css({
      'color' : "white",
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'px',
      'background-color': color
    }).fadeIn(100).delay(1000);
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

  socket.on('myClick', function (data) {
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
    $scoreboard.empty();
    $scoreboard.append($("<thead>"+"</thead>").append($("<td>"+"User"+"</td>"),$("<td>"+"Score"+"</td>")));
    for (let key in scores) {
      $scoreboard.append($("<tr>").append($("<td>"+key+"</td>"),$("<td>"+scores[key]+"</td>")));
    }

  });
  socket.on("newChat", function (data) {
    $chat.append($("<h2>"+data.chat+"</h2>"))
  });

  socket.on("newUser", function (data) {
    console.log(data);
    if (newuser) {
      user = data.user;
      newuser=false;
    }



  });





  //end onload
})
