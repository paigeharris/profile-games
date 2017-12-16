const app = angular.module("Profile-GamesApp",[]);

app.controller("MainController",["$http",function ($http) {
  //begin MainController
  this.hello="Hello World";
  this.showgame=true;
  //togglegame doesnt work yet sorry, will work soon
  this.toggleGame = () => {
    if (this.showgame) {
      this.showgame=false;
    }else {
      this.showgame=true;
    }}
  //end MainController
}]);
