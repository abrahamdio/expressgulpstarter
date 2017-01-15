export default class Posts {
  	constructor(Auth, $state, $http) {
  		'ngInject';

  		this._Auth = Auth;
  		this._$http = $http;
  		this.posts = [];
  	}
  	
  	getAll() {
  		return this._$http.get('/posts').then(
        (res) =>{
          angular.copy(res.data, this.posts);
        }
      );
  	}

  	create(post){
  		return this._$http.post('/posts',post, {
  			headers: { Authorization: 'Bearer '+ this._Auth.getToken() }
  		}).then(
        (res) => {
          this.posts.push(res.data);
        }
      );
  	};

  	upvote(post){
  		return this._$http.put('/posts/' + post._id + '/upvote', null, {
  			headers: {Authorization: 'Bearer '+ this._Auth.getToken()}
  		}).then(
        (res) => {
          post.upvotes += 1;
        }
      );
  	};

  	get(id){
  		return this._$http.get('/posts/' + id).then(
        (res) => {
          return res.data;
        }
      )
  	};

  	addComment(id, comment){
  		return this._$http.post('/posts/' + id + '/comments', comment, {
  			headers: {Authorization: 'Bearer '+ this._Auth.getToken()}
  		});
  	}

  	upvoteComment(post, comment){
  		return this._$http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
  			headers: {Authorization: 'Bearer '+this._Auth.getToken()}
  		})
  		.then(
        (res) => {
          comment.upvotes += 1;
        }
      );
  	}
}