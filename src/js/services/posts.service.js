export default class Posts {
  	constructor(Auth, $state, $http) {
  		'ngInject';

  		this._Auth = Auth;
  		this._$http = $http;
  		this.posts = [];
  	}
  	
  	getAll() {
  		return this._$http.get('/posts').success(
        (res) =>{
          angular.copy(res, this.posts);
        }
      );
  	}

  	create(post){
  		return this._$http.post('/posts',post, {
  			headers: { Authorization: 'Bearer '+ this._Auth.getToken() }
  		}).success(function(data){
  			this.posts.push(data);
  		});
  	};

  	upvote(post){
  		return this._$http.put('/posts/' + post._id + '/upvote', null, {
  			headers: {Authorization: 'Bearer '+ this._Auth.getToken()}
  		}).success(function(data){
  			post.upvotes += 1;
  		});
  	};

  	get(id){
  		return this._$http.get('/posts/' + id).then(function(res){
  			return res.data;
  		});
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
  		.success(function(data){
  			comment.upvotes += 1;
  		});
  	}
}