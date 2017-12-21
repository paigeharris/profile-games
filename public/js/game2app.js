//Client
let userg2=null;

var Client = {};

Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    MMO.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        MMO.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        MMO.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        MMO.removePlayer(id);
    });
});
//end client



//MMO Game
var MMO = {};

MMO.init = function(){
    game2.stage.disableVisibilityChange = true;
};

MMO.preload = function() {



};

MMO.create = function(){
    MMO.playerMap = {};
    game2.inputEnabled = true;
    game2.input.onUp.add(MMO.getCoordinates, this);


};

MMO.getCoordinates = function(pointer){

      console.log("wowzers");
      console.log(pointer.worldX,pointer.worldY);
      if (userg2===null) {
        console.log("Player has to join the game..");
      }
      else {
        Client.sendClick(pointer.worldX,pointer.worldY);
      }

};

MMO.addNewPlayer = function(id,x,y){

    MMO.playerMap[id] = MMO.add.sprite(x,y,"avatar");
    console.log("Sprite Created!");
    MMO.playerMap[id].width=50;
    MMO.playerMap[id].height=50;
};

MMO.movePlayer = function(id,x,y){
    var player = MMO.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game2.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

MMO.removePlayer = function(id){
    MMO.playerMap[id].destroy();
    delete MMO.playerMap[id];
};


//xhttp
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
     console.log("happiness");
     userg2= JSON.parse(xhttp.responseText);
     console.log(userg2+" before file");
     console.log(userg2.avatar+ " avatar");
     let file = {
       type: 'image',
       key: 'avatar',
       url: userg2.avatar,
       data: null,
       error: false,
       loaded: false
     };
       console.log(file.url+ " file url");
     file.data = new Image();
     file.data.name = file.key;
     file.data.onload = function () {
       file.loaded = true;
       game2.cache.addImage(file.key, file.url, file.data);
       game2.load.image("avatar");
       game2.load.start()
       Client.askNewPlayer();
     };
     file.data.onerror = function () {
       file.error = true
       console.log("hey",file.error);
     };
       // file.data.crossOrigin = '';
       file.data.src = file.url;
  }
  else if (this.readyState == 4 && this.status == 400) {
    console.log("sadness");
    userg2 ={
      username : Math.round(0xffffff * Math.random()).toString(16),
      avatar:"https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"
    }
    game2.load.image("avatar",userg2.avatar)
    game2.load.start()

    Client.askNewPlayer();
    console.log(userg2);
  }
};

const commenceImage = () => {



}
//end xhttp

//http request button
$(() => {
  //onload
  const $g2button = $("<button>"+"Join Game 2"+"</button>").click(() => {
    xhttp.open("GET", "/sessions/", true);
    xhttp.send();
  })
  const $game2container=$(".game2container").append($g2button);

  //end onload
});
//end http request button

// console.log($game2);
let game2 = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game2'));
game2.state.add('MMO',MMO);
game2.state.start('MMO');

console.log("hey");
