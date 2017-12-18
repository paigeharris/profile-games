const app = angular.module("Profile-GamesApp",[]);

app.controller("MainController",["$http",function ($http) {
  //begin MainController
  // ctrl variables
  this.hello="Hello World";
  this.showgame=true;
  this.shownav=false;
  // ctrl functions
  this.toggleGame = () => {
    if (this.showgame) {
      this.showgame=false;
    } else {
      this.showgame=true;
    }}

  this.openNav = () => {
    this.shownav=true;
  }

  this.closeNav = () => {
    this.shownav=false;
  }
  //end MainController

//navbar




 //


}]);
