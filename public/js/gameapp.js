let newuser =true;
var socket = io();
socket.connect();

let user ="unchanged";
let username ="unchanged";
let allchats = ["Chat"];
const $gamebutton = $("<button>"+"Click Me To Score"+"</button>").addClass("scorebutton");
let $startgame = $("<button data-ng-click='gctrl.getUser()'>"+"Join Game"+"</button>").addClass("joinbutton").click((e) => {
  socket.emit('newUser', {

  })
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
    username=Math.round(0xffffff * Math.random()).toString(16);
    $http({
      url:"/sessions",
      method:"get"
    }).then((response) => {
      console.log(response.data);
      this.user=response.data;
      user = response.data;
      username=response.data.username||Math.round(0xffffff * Math.random()).toString(16);
      newuser=false;

    }).catch((err) => {
      console.log(err);
    })
  }
}]);
//end GameController





$(() => {
  //onload

  const $gamecontainer = $(".gamecontainer");
  const $game = $("#game")
  const $scoreboard = $("<table>").addClass("scoreboard")
  $scoreboard.append($("<thead>"+"</thead>").addClass("scorehead").append($("<td>"+"User"+"</td>").addClass("scoretd"),$("<td>"+"Score"+"</td>").addClass("scoretd"),$("<td>"+"Avatar"+"</td>").addClass("scoretd")));

  $scoreboard.append($("<tr>").addClass("scorerow").append($("<td>"+"Player"+"</td>").addClass("scoretd"),$("<td>"+"5"+"</td>").addClass("scoretd"),$("<td>").addClass("scoretd").append($("<img>").addClass("scoreimg").attr("src","https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"))));

  const $livechat = $("<form onsubmit='return false'>").addClass("chatform");
  const $chat = $("<div>").addClass("chatbox").append($("<h2>"+"Chat"+"</h2>").addClass("chath2"));

  $livechat.append( $("<input type='submit' value='Go'>").addClass("chatsubmit"));
  let $typed = $("<input type='text' placeholder='LiveChat Here'>").addClass("chatinput");

  $livechat.append($typed);
  $livechat.submit(() => {
    allchats.push($typed.val())
    $chat.empty();
    for (chat of allchats) {
      $chat.append($("<h2>"+chat+"</h2>").addClass("chath2"))
      $chat.append($("<hr>").addClass("chathr"));
    }

    socket.emit('newChat', {
      allchats:allchats
    })
    $typed.val("");


  });
  $game.css({
    // width:'800px',
    height:'600px',
    overflow:"hidden"
  })
  $gamecontainer.append($startgame)
  $game.append($gamebutton.hide());
  $gamecontainer.append($livechat);
  $gamecontainer.append($scoreboard);
  $gamecontainer.append($game);
  $gamecontainer.append($chat);



  let scores = {}

  $gamebutton.on("click",() => {
    function getPosition(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    let posx = getPosition($game.position().left,$("#game").width());
    let posy = getPosition($game.position().top,$("#game").height()-$gamebutton.height());
    console.log("PosX: "+posx+"   PosY: "+posy);
    $gamebutton.css({
      'color' : "white",
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'px',
      'background-color': color
    }).fadeIn(100).delay(1000);
    // $gamebutton.show();
    if (scores[username]!=null) {
      if (scores[username]["score"]!=null) {
        scores[username].score++;
      }
    }else {
      scores[username]={
        score:1,
        avatar:user.avatar||"https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"
      }
    }

    console.log(scores);
    console.log("My Score: "+scores[username]);
    $scoreboard.empty();
    $scoreboard.append($("<thead>"+"</thead>").addClass("scorehead").append($("<td>"+"User"+"</td>").addClass("scoretd"),$("<td>"+"Score"+"</td>").addClass("scoretd"),$("<td>"+"Avatar"+"</td>").addClass("scoretd")));
    for (let key in scores) {
      $scoreboard.append($("<tr>").addClass("scorerow").append($("<td>"+key+"</td>").addClass("scoretd"),$("<td>"+scores[key].score+"</td>").addClass("scoretd"),$("<td>").addClass("scoretd").append($("<img>").addClass("scoreimg").attr("src",scores[key].avatar))));
    }

    socket.emit('myClick', {
      color: color,
      posx:posx,
      posy:posy,
      scores:scores


    });
  });
  //end gamebutton click


  socket.on('myClick', function (data) {
    scores=data.scores;
    console.log(data.scores);
    $gamebutton.css({
      'color' : "white",
      'position':'absolute',
      'left':data.posx+'px',
      'top':data.posy+'px',
      'background-color': data.color
    }).fadeIn(100).delay(1000);
    // $gamebutton.show();
    $scoreboard.empty();
    $scoreboard.append($("<thead>"+"</thead>").addClass("scorehead").append($("<td>"+"User"+"</td>").addClass("scoretd"),$("<td>"+"Score"+"</td>").addClass("scoretd"),$("<td>"+"Avatar"+"</td>").addClass("scoretd")));
    for (let key in scores) {
      $scoreboard.append($("<tr>").addClass("scorerow").append($("<td>"+key+"</td>").addClass("scoretd"),$("<td>"+scores[key].score+"</td>").addClass("scoretd"),$("<td>").addClass("scoretd").append($("<img>").addClass("scoreimg").attr("src",scores[key].avatar))));
    }

  });
  // end recieve newclick
  socket.on("newChat", function (data) {
    console.log(data);
    allchats=data.allchats;
    $chat.empty();
    for (chat of allchats) {
      $chat.append($("<h2>"+chat+"</h2>").addClass("chath2"))
      $chat.append($("<hr>").addClass("chathr"))
    }
  });
  // end recieve newchat

  socket.on("newUser", function (data) {
    console.log(data);
    // if (newuser) {
    //   user = data.user;
    //   newuser=false;
    // }
    socket.emit('myClick', {
      color: color,
      posx:posx,
      posy:posy,
      scores:scores


    });
    // end recieve newuser


  });






  //end onload
})
