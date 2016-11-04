function PostsConfig($stateProvider, $httpProvider) {
  'ngInject';

  // Define the routes
  $stateProvider
  .state('app.posts', {
    url:'/posts/{id}',
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl as $ctrl',
    title: 'Posts',
    resolve: {
      post: function($stateParams, Posts) {
        return Posts.get($stateParams.id);
      }
    }
  });

};

export default PostsConfig;