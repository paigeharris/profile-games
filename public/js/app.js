const app = angular.module("Profile-GamesApp",[]);

app.controller("MainController",["$http",function ($http) {
  //begin MainController
  this.hello="Hello World";
  this.showgame=true;
  this.toggleGame = () => {
    if (this.showgame) {
      this.showgame=false;
    }else {
      this.showgame=true;
    }}
  //end MainController

//navbar
 this.openNav() {
   document.getElementById('mySidenav').style.width= "250px";
 }

 this.closeNav(){
   document.getElementById("mySidenav").style.width="0";
 }



}]);
