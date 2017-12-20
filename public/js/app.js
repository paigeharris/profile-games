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
  this.useredit= false;
  this.players = false;
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
    if (this.user.logged){

    this.profile = true;
  }else {
    this.openlogreg();
  }
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

  //--------------All Players Modal----------------//
  this.openPlayers = () => {
    if (this.user.logged){
      this.players = true;
      this.AllUsers()
    } else {
      this.error= true;
    }
  }

  this.closePlayers = () => {
    this.players = false
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
    }).then((response) => {
      console.log('Successful registration');
      // updateUser(response.data);
      this.user = response.data;
      this.newUserForm = {};
      this.error = null;
      this.user.logged=true;
    }, ex => {
      console.log(ex.data.err);
      // this.error = ex.statusText;
      this.registerError = 'Incorrect username?';
    }).catch(err => this.error = '');
  };


  this.editUser = () => {
    $http({
      url: '/users/' + this.user._id,
      method: 'put',
      data: this.user
    }).then((response) => {
      this.useredit=false;
    },(ex) => {
      console.log(ex.data.err);

    }).catch((err) => {
      console.log(err);
    })
  }

  this.deleteUser = () => {
    $http({
      url: '/users/' + this.user._id,
      method: 'DELETE'
    }).then((response) => {
      this.user=null;
      this.useredit=false;
      this.closeProfile();
    },(ex) => {
      console.log(ex.data.err);
    }).catch((err) => {
      console.log(err);
    })
  }

  this.loginUser = () => {
    console.log("login user function is running");
    $http({

      url: '/sessions/login',
      method: 'post',
      data: this.loginForm
    }).then((response) =>{
      // updateUser(response.data);
      this.user = response.data;
      this.user.logged=true;
      console.log(this.user.username);
      this.loginForm = {};
      this.error = null;
    }, ex => {
      console.log('ex'. ex.data.err);
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };


  this.logoutUser = () => {
    console.log('log out button is clicked');
    $http({
      url: '/sessions/logout',
      method: 'delete'
    }).then((response) => {
      console.log(response.data);

      user = {};
      this.user.logged = false;
      this.user = null;
    }, ex => {
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };

this.AllUsers = () => {
  $http({
    url:'/sessions/all',
    method: 'get',
  }).then((response) => {
    this.Players = response.data
console.log(this.Players);
  })
}
  this.hello = "Hello World";


}]); //end MainController
