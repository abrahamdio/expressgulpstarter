class PostsCtrl {
	constructor(Auth, Posts, post) {
		'ngInject';

		this._Auth = Auth;
		this._Posts = Posts;
		this.isLoggedIn = Auth.isLoggedIn();
		this.post = post;
	}

	addComment(){
		if(this.formData === '') { return; }

		this._Posts.addComment(this.post._id, {
			body: this.formData.comment,
			author: 'user',
		}).then(
			(res) => {
				this.post.comments.push(res.data)
			}
		)
		this.formData = '';
	}

	incrementUpvotes(comment){
		this._Posts.upvoteComment(this.post, comment);
	}
}

export default PostsCtrl;