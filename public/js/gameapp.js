let newuser =true;
let game = {
  _id: "5a3b3510dcd7051457168ca8"
};
let newgame = {
color: "red",
scores:{}
};
var socket = io();
socket.connect();
let scores = {}
let user ="unchanged";
let username ="unchanged";
let allchats = ["Chat"];

const $scoreboard = $("<table>").addClass("scoreboard")
const $livechat = $("<form onsubmit='return false'>").addClass("chatform");
const $chat = $("<div>").addClass("chatbox").append($("<h2>"+"Chat"+"</h2>").addClass("chath2"));
const $newbutton = $("<button data-ng-click='gctrl.newGame()'>"+"(Dev) For DB Entry"+"</button>").addClass("newbutton");
const $gamebutton = $("<button data-ng-click='gctrl.setGameData()'>"+"Click Me To Score"+"</button>").addClass("scorebutton");

//setgame
const setgame = () => {
  console.log("setting game");
  console.log("PosX: "+game.posx+"   PosY: "+game.posy);
  $gamebutton.css({
    'color' : "white",
    'position':'relative',
    'left':game.posx+'px',
    'top':game.posy+'px',
    'background-color': game.color
  }).fadeIn(100).delay(1000);

  $scoreboard.empty();
  $scoreboard.append($("<thead>"+"</thead>").addClass("scorehead").append($("<td>"+"User"+"</td>").addClass("scoretd"),$("<td>"+"Score"+"</td>").addClass("scoretd"),$("<td>"+"Avatar"+"</td>").addClass("scoretd")));
  let i = 0;
  let keyarr =[];
  for (let key in game.scores)  {
    keyarr.unshift(key);
  }
  for (let key of keyarr) {
    if (i>7) {
      break;
    }
    i++;
    $scoreboard.append($("<tr>").addClass("scorerow").append($("<td>"+key+"</td>").addClass("scoretd"),$("<td>"+game.scores[key].score+"</td>").addClass("scoretd"),$("<td>").addClass("scoretd").append($("<img>").addClass("scoreimg").attr("src",game.scores[key].avatar))));
  }
}
//end setgame
//start game
const $startgame = $("<button data-ng-click='gctrl.getUser()'>"+"Join Game"+"</button>").addClass("joinbutton").click((e) => {

  // $(this).hide();
  // newuser=false;
  $gamebutton.show();
});
// end=>start game


//gamecontroller
app.controller("GameController", ["$http","$compile","$scope", function($http,$compile,$scope) {
  let temp1 = $compile($newbutton)($scope);
  let temp2 = $compile($gamebutton)($scope);
  let temp3 = $compile($startgame)($scope);
  this.hello="heya";
  this.user = "";
  console.log("hey")


  this.setGameData= () => {
    console.log(game);
    this.game=game;
    $http({
      url:"/games/"+game._id,
      method:"put",
      data:this.game
    }).then((response) => {

      // setgame();
      console.log("Edit Res: ",response.data);


    }).catch((err) => {
      console.log(err);
    })

  };

  this.getGameData= () => {
    this.game=game;
    $http({
      url:"/games/"+this.game._id,
      method:"get"
    }).then((response) => {
      if (newuser) {
        game=response.data;
        newuser=false;
      }

      console.log("Get Res: ",response.data);
      setgame();

    }).catch((err) => {
      console.log(err);
    })
  };


  //end getGameData
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
      this.getGameData();
    },(ex) => {
      console.log("Not Logged In, Giving Random name");
      this.getGameData();
    }).catch((err) => {
      console.log("Random name Given");
    })
    // this.getGameData();

  }
  //end getUser

  this.newGame= () => {
    $http({
      url:"/games",
      method:"post",
      data: newgame
    }).then((response) => {
      console.log(response.data);
      game= response.data;
      setgame();
      console.log("New Game: ",game);
    }).catch((err) => {
      console.log(err);
    })

  }
  //end getGameData

}]);
//end GameController





$(() => {
  //onload
  const $gamecontainer = $(".gamecontainer");
  const $game = $("#game")
  $scoreboard.append($("<thead>"+"</thead>").addClass("scorehead").append($("<td>"+"User"+"</td>").addClass("scoretd"),$("<td>"+"Score"+"</td>").addClass("scoretd"),$("<td>"+"Avatar"+"</td>").addClass("scoretd")));

  $scoreboard.append($("<tr>").addClass("scorerow").append($("<td>"+"Player"+"</td>").addClass("scoretd"),$("<td>"+"5"+"</td>").addClass("scoretd"),$("<td>").addClass("scoretd").append($("<img>").addClass("scoreimg").attr("src","https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"))));
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
  $gamecontainer.append($newbutton)
  $game.append($gamebutton.hide());
  $gamecontainer.append($livechat);
  $gamecontainer.append($scoreboard);
  $gamecontainer.append($game);
  $gamecontainer.append($chat);
  //begin setgame

//formgame
  const formgame = () => {
    console.log("forming game");
    function getPosition(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    if (game.scores[username]!=null) {
      if (game.scores[username]["score"]!=null) {
        game.scores[username].score++;
      }
    }else {
      game.scores[username]={
        score:1,
        avatar:user.avatar||"https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"
      }
    }
    console.log(game.scores[username].score+": your score");
    game.color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    game.posx = getPosition(0,$("#game").width()-($gamebutton.width()*1.5));
    game.posy = getPosition(0,$("#game").height()-($gamebutton.height()*1.5));
    console.log("PosX: "+game.posx+"   PosY: "+game.posy);
    $gamebutton.css({
      'color' : "white",
      'position':'relative',
      'left':game.posx+'px',
      'top':game.posy+'px',
      'background-color': game.color
    }).fadeIn(100).delay(1000);
    $gamebutton.show();



    socket.emit('myClick', game);
    setgame();


  };
  //end formgame

  $gamebutton.on("click",formgame)

  socket.on('myClick', function (data) {
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "PUT", "/games/"+data._id,true);
    // xmlHttp.send(data);
    game = data;
    console.log(game);
    console.log(data.scores);
    setgame();
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

  // socket.on("newUser", function (data) {
  //   console.log(data);
  //   // if (newuser) {
  //   //   user = data.user;
  //   //   newuser=false;
  //   // }
  //   socket.emit('myClick', {
  //     color: game.color,
  //     posx:game.posx,
  //     posy:game.posy,
  //     scores:game.scores
  //
  //
  //   });
  //   // end recieve newuser
  //
  //
  // });






  //end onload
})
