const app = angular.module("Profile-GamesApp",[]);

app.controller("MainController",["$http",function ($http) {

  // testing
  this.hello="Hello World";

  // ctrl variables
  this.showgame = true;
  this.shownav = false;

  // ctrl functions
  this.toggleGame = () => {
    if (this.showgame) {
      this.showgame = false;
    } else {
      this.showgame = true;
    }};

  // navbar
  this.openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    this.shownav = true;
  };

  this.closeNav = () => {
      document.getElementById("mySidenav").style.width = "0";
    this.shownav = false;
  };

  // users/authorization
  this.user = {};
  this.error = null;

  this.registerUser = () => {
    $http({
      url: '/users',
      method: 'post',
      data: this.newUserForm
    }).then(response => {
      console.log('Successful registration');
      this.user = response.data;
    }, ex => {
      console.log(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = 'Is server working?');
  };

  this.loginUser = () => {
    $http({ url: '/sessions/login',
    method: 'post',
    data: this.loginForm })
  };

  this.logoutUser = () => {
    $http({
      url: '/sessions/logout',
      method: 'delete'
    }).then((response) => {
      console.log(response.data);
      this.user = null;
    });
  };




}]); //end MainController
