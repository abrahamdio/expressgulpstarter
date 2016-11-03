export default class Auth {
  	constructor(AppConstants, $http, $window, $rootScope) {
    	'ngInject';
      this.isLoggedInBool = false;
    	this._AppConstants = AppConstants;
    	this._$http = $http;
      this._$window = $window;
      this.model = {
        isLoggedInBool: true
      }
  	}

    saveToken(token){
      this.isLoggedInBool = true;
      return this._$window.localStorage['flapper-news-token'] = token;
    }

    getToken(){
      return this._$window.localStorage['flapper-news-token'];
    }

    isLoggedIn(){
      var token = this.getToken();

      if(token){
        let payload = JSON.parse(this._$window.atob(token.split('.')[1]));
        let res = payload.exp > Date.now() / 1000;
        this.isLoggedInBool = res;
        return res
      } else {
        this.isLoggedInBool = false;
        return false;
      }
    }

    currentUser(){
      if(this.isLoggedIn()){
        let token = this.getToken();
        let payload = JSON.parse(this._$window.atob(token.split('.')[1]));

        return payload.username;
      }
    }

    register(user){
        return this._$http.post('/register', user).then(
          (res) => {
            this.saveToken(res.data.token);
          }
        );
    }

    logIn(user){
      return this._$http.post('/login', user).then(
        (res) => {
          this.saveToken(res.data.token);
        }
      );
    }

    logOut(){
      this.isLoggedInBool = false;
      this.model.isLoggedInBool = false;
      console.log('logout', this.isLoggedInBool, this.model.isLoggedInBool);
      this._$window.localStorage.removeItem('flapper-news-token');
    };
}