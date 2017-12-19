let newuser =true;
var socket = io();
socket.connect();

let user ="unchanged";
let username ="unchanged";
let allchats = [];
const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
let $startgame = $("<button data-ng-click='gctrl.getUser()'>"+"Join Game"+"</button>").click((e) => {
  $(this).hide();
  $gamebutton.show();
})


//gamecontroller
app.controller("GameController", ["$http","$compile","$scope", function($http,$compile,$scope) {
  let temp = $compile($startgame)($scope);
  this.hello="heya";
  this.user = "";
  console.log("hey")
  this.getUser = () => {
    console.log("clicked");
    $http({
      url:"/sessions",
      method:"get"
    }).then((response) => {
      console.log(response.data);
      this.user=response.data;
      user = response.data;
      username=response.data.username;
        newuser=false;

    }).catch((err) => {
      console.log(err);
    })
  }
  }]);
//end GameController





$(() => {
  //onload


  const $game = $("#game")
  const $scoreboard = $("<table>");

  const $livechat = $("<form onsubmit='return false'>")
  const $chat = $("<div>")
  let $typed = $("<input type='text' placeholder='LiveChat Here'>")
  $livechat.append($typed);
  $livechat.append( $("<input type='submit' value='Go'>"));
  $livechat.submit(() => {
    allchats.push($typed.val())
    $chat.empty();
    for (chat of allchats) {
      $chat.append($("<h2>"+chat+"</h2>"))
    }

    socket.emit('newChat', {
      allchats:allchats
    })
      // $typed.val("");


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
    if (scores[username]!=null) {
      scores[username]++;
    }
    else {
      scores[username]=1;
    }

    console.log(scores);
    console.log("My Score: "+scores[username]);
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
    console.log(data);
    allchats=data.allchats;
    $chat.empty();
    for (chat of allchats) {
      $chat.append($("<h2>"+chat+"</h2>"))
    }
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
