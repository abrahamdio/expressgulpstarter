class AuthCtrl {
	constructor(Auth, $state) {
		'ngInject';

		this._Auth = Auth;
		this._$state = $state;
		this.user = {};
		
		this.title = $state.current.title;
		this.authType = $state.current.name.replace('app.', '');
		this.errors = "";
	}

	register(){
	  	this._Auth.register(this.user).then(
	  		(res) => {
	  			this._$state.go('app.home');
	  		},
	  		(err) => {
	  			this.errors = err.data.message;
	  		}
	  	)
	}

	logIn(){
	  	this._Auth.logIn(this.user).then(
	  		(res) => {
	  			this._$state.go('app.home');
	  		},
	  		(err) => {
	  			this.errors = err.data.message;
	  		}
	  	)
	}
}

export default AuthCtrl;