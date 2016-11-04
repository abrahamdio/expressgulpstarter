class HomeCtrl {
  constructor(AppConstants, Auth, Posts) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Auth = Auth;
    this._Posts = Posts;
    this.isLoggedIn = Auth.isLoggedIn();
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
    }
}

export default HomeCtrl;
