class PostsCtrl {
	constructor(Auth, Posts, post) {
		'ngInject';

		this._Auth = Auth;
		this._Posts = Posts;
		this.isLoggedIn = Auth.isLoggedIn();
		this.post = post;
		console.log('post', post)
	}

	addComment(){
		if(this.formData === '') { return; }

		this._Posts.addComment(this.post._id, {
			body: this.formData.comment,
			author: 'user',
		}).success(
			(comment) => {
				this.post.comments.push(comment)
			}
		)
		this.formData = '';
	}

	incrementUpvotes(comment){
		this._Posts.upvoteComment(this.post, comment);
	}
}

export default PostsCtrl;