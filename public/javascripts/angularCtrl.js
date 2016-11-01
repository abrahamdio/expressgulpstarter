angular.module('flapperNews')

.controller('PostsCtrl', [
	'$scope',
	'posts',
	'post',
	'auth',
	PostsCtrlDef
])

.controller('MainCtrl', [
	'$scope',
	'posts',
	'auth',
	MainCtrlDef
])

.controller('AuthCtrl', [
	'$scope', 
	'$state',
	'auth',
	AuthCtrlDef
])

.controller('NavCtrl', [
	'$scope',
	'auth',
	function($scope, auth){
  		$scope.isLoggedIn = auth.isLoggedIn;
  		$scope.currentUser = auth.currentUser;
  		$scope.logOut = auth.logOut;
	}
])

function PostsCtrlDef($scope, posts, post, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.post = post;

	$scope.addComment = function(){
		if($scope.body === '') { return; }
		posts.addComment(post._id, {
			body: $scope.body,
			author: 'user',
		}).success(function(comment){
			$scope.post.comments.push(comment);
		});
		$scope.body = '';
	};

	$scope.incrementUpvotes = function(comment){
		posts.upvoteComment(post, comment);
	}
}

function MainCtrlDef($scope, posts, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.posts = posts.posts;

	$scope.addPost = function(){
		// check for empty string
		if (!$scope.title || $scope.title === '') {return;}

		posts.create({
			title: $scope.title,
			link: $scope.link
		})
		
		$scope.title = '';
		$scope.link = '';
	}

	$scope.incrementUpvotes = function (post){
		posts.upvote(post);
	}
}

function AuthCtrlDef($scope, $state, auth){
	$scope.user = {};

	$scope.register = function(){
	  	auth.register($scope.user).error(function(error){
	    	$scope.error = error;
	  	}).then(function(){
	    	$state.go('home');
	  	});
	};

	$scope.logIn = function(){
	  	auth.logIn($scope.user).error(function(error){
	    	$scope.error = error;
	  	}).then(function(){
	    	$state.go('home');
	  	});
	};
}