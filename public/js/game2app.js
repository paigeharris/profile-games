
var MMO = {};

MMO.init = function(){
    game2.stage.disableVisibilityChange = true;
};

MMO.preload = function() {
    game2.load.tilemap('map', '/assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game2.load.spritesheet('tileset', '/assets/map/tilesheet.png',32,32);
    game2.load.image('sprite','/assets/sprites/sprite.png');
};

MMO.create = function(){
    MMO.playerMap = {};
    var testKey = game2.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game2.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(MMO.getCoordinates, this);
    Client.askNewPlayer();
};

MMO.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

MMO.addNewPlayer = function(id,x,y){
    MMO.playerMap[id] = MMO.add.sprite(x,y,'sprite');
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

//Client

var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

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

// console.log($game2);
let game2 = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game2'));
game2.state.add('MMO',MMO);
game2.state.start('MMO');
// const $game2 = $("#game2").css({
//   "overflow":"visible"
// });
// $("body").append($game2);
console.log("hey");
