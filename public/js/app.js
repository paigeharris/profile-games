const app = angular.module("Profile-GamesApp", []);


app.controller("MainController", ["$http", function($http) {
  //begin MainController
  // ctrl variables
  this.hello = "Hello World";
  this.showgame = true;
  this.shownav = false;
  this.logreg = false;
  this.profile = false;
  this.about = false;
  this.contact= false;
  // ctrl functions

  //---------------toggleGame-----------------------//
  this.toggleGame = () => {
    if (this.showgame) {
      this.showgame = false;
    } else {
      this.showgame = true;
    }
  }

  //---------------------openNav-----------------------//
  this.openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    this.shownav = true;
  }

  this.closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    this.shownav = false;
  }

  //------------show reg/log in modal---------------//
  this.openlogreg = () => {
    this.logreg = true;
  }

  this.closelogreg = () => {
    this.logreg = false;
  }
  //------------ProfileModal---------------------//
  this.openProfile = () => {
    this.profile = true;
  }

  this.closeProfile = () => {
    this.profile = false;
  }

  //----------------AboutUs Modal--------------------//
  this.openAbout = () => {
    this.about = true;
  }

  this.closeAbout = () => {
    this.about = false;
  }

  //---------------ContactUs Modal------------------//
  this.openContact = () => {
    this.contact  = true;
  }

  this.closeContact = () => {
    this.contact = false;
  }

  // --------------------------------------------
  // Users/authorization
  this.user = {};
  this.error = null;

  this.registerUser = () => {
    $http({
      url: '/users',
      method: 'post',
      data: this.newUserForm
    }).then(response => {
      console.log('Successful registration');
      updateUser(response.data);
      this.user = user;
      this.newUserForm = {};
      this.error = null;
    }, ex => {
      console.log(ex.data.err);
      // this.error = ex.statusText;
      this.registerError = 'Incorrect username?';
    }).catch(err => this.error = '');
  };

  this.loginUser = () => {
    $http({

      url: '/sessions/login',
      method: 'post',
      data: this.loginForm
    }).then(response =>{
      updateUser(response.data);
      this.user = user
      this.loginForm = {};
      this.error = null;
    }, ex => {
      console.log('ex'. ex.data.err);
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };


  this.logoutUser = () => {
    $http({
      url: '/sessions/logout',
      method: 'delete'
    }).then((response) => {
      console.log(response.data);
      user = {};
      this.user = null;
    }, ex => {
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };


  this.hello = "Hello World";


}]); //end MainController
