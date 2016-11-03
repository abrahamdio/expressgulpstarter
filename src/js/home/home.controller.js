class HomeCtrl {
  constructor(AppConstants, Auth, Posts, postPromise, $rootScope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Auth = Auth;
    this._Posts = Posts;
    Auth.isLoggedIn();
    this.isLoggedIn = Auth.isLoggedInBool;
    console.log('check isloggedin', this.isLoggedIn)
    this.posts = this._Posts.posts;
  }

    addPost(){
    	// check for empty string
    	if (!this.formData.title || this.formData.title === '') {return;}

    	this._Posts.create({
    		title: this.formData.title,
    		link: this.formData.link
    	})
    	
    	this.formData.title = '';
    	this.formData.link = '';
    }

    incrementUpvotes(post){
    	this._Posts.upvote(post);
        console.log(this.isLoggedIn)
    }
}

export default HomeCtrl;
