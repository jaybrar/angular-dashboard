var myApp = angular.module("myApp", ['ngRoute', 'angularMoment']);
//use config method to set up routing
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl:'partials/login_register.html'})
	.when('/dashboard', {templateUrl:'partials/dashboard.html'})
	.when('/topic/:topicId', {templateUrl: "partials/topic.html",
		controller: 'topicsController'})
	.when('/profile/:name', {templateUrl: 'partials/profile.html', 
		controller: 'profileController'})
	.when('/logout', {templateUrl: 'partials/login_register.html'})
	.otherwise({redirectTo:'/'});
})



//create the factory
myApp.factory('dashboardFactory', function($http){
	var userName;
	var topics = [];
	var factory = {};
	var topic, posts, comments, topicsCount, postsCount, commentsCount;
	var  count = 0

	factory.getUserName = function(callback){
		$http.get('/username').success(function(results){
			userName = results;
			// console.log(userName);
			callback(userName);
		})
	}
	factory.addUser = function(newuser, callback){
		// console.log(newuser);
		$http.post('/add_username', newuser).success(function(){
			// callback(username);
		})
	}
	factory.getTopics = function(callback){
		$http.get('/topics').success(function(results){
			topics = results;
			callback(topics);
		})
	}
	factory.addTopic = function(topic, callback){
		$http.post('/add_topic', topic).success(function(output){
			callback(output);
		})
	}
	factory.getTopic = function(id, callback){
		$http.get('/topic/' + id).success(function(results){
			topic = results;
			callback(topic);
		})
	}
	factory.getPosts = function(callback){
		$http.get('/posts').success(function(results){
			posts = results;
			callback(posts);
		})
	}
	factory.addPost = function(post, callback){
		$http.post('/add_post', post).success(function(){
			callback(posts);
		})
	}
	factory.addComment = function(comment, callback){
		$http.post('/add_comment', comment).success(function(){
			callback(comments);
		})
	}
	factory.getComments = function(callback){
		$http.get('/comments').success(function(results){
			comments = results;
			callback(comments);
		})
	}
	// //get count of the posts per topic
	// factory.getCount = function(id, callback){
	// 	$http.get('/count/' + id).success(function(results){
	// 		callback(results);
	// 	})
	// }
	// get topics count/per user
	factory.getTopicsCount = function(name, callback){
		$http.get('/topic_count/' + name).success(function(results){
			topicsCount = results;
			callback(topicsCount);
		})
	}
	// //get posts count/per user
	factory.getPostsCount = function(name, callback){
		$http.get('/post_count/' + name).success(function(results){
			postsCount = results;
			callback(postsCount);
		})
	}
	// //get comments count/per user
	factory.getCommentsCount = function(name, callback){
		$http.get('/comment_count/' + name).success(function(results){
			commentsCount = results;
			callback(commentsCount);
		})
	}
	factory.upvote = function(id){
		$http.post('/upvote', id).success(function(){
			console.log("added upvote");
		})
	}
	factory.downvote = function(id){
		$http.post('/downvote', id).success(function(){
			console.log("added downvote");
		})
	}
	return factory;
})
//create dashboard controller
myApp.controller('dashboardController', function($scope, $location, dashboardFactory){
	dashboardFactory.getUserName(function(data){
		$scope.userName = data;
		// console.log($scope.userName);
	})
	$scope.welcome = function(path){
		$location.path( path );
		dashboardFactory.addUser($scope.newUser, function(){
		})
	}
	//get all the topics from factory
	dashboardFactory.getPosts(function(data){
		$scope.posts = data;
	})

	dashboardFactory.getTopics(function(data){
		$scope.topics = data;
		for(var i = 0; i<$scope.topics.length;i++){
		var count = 0;
		for(var j = 0; j<$scope.posts.length;j++){
		if($scope.posts[j].topic_id==$scope.topics[i]._id){
			count++;
			}
		}
		$scope.topics[i].num_of_posts = count;
		}
	})

	$scope.addTopic = function(){
		$scope.newTopic.name = $scope.userName;
		dashboardFactory.addTopic($scope.newTopic, function(output){
			if(output){
				console.log(output.errors.description.message);
			}else{
			dashboardFactory.getTopics(function(data){
			$scope.topics = data;
			for(var i = 0; i<$scope.topics.length;i++){
			var count = 0;
			for(var j = 0; j<$scope.posts.length;j++){
			if($scope.posts[j].topic_id==$scope.topics[i]._id){
				count++;
				}
			}
			$scope.topics[i].num_of_posts = count;
			}
			})
			}
			$scope.newTopic = {};
		})
	}

})
// create profile controller
myApp.controller('profileController', function($scope,$routeParams, dashboardFactory){
	$scope.person = $routeParams.name;
	dashboardFactory.getUserName(function(data){
		$scope.userName = data;
	})
	//get count of topics
	dashboardFactory.getTopicsCount($scope.person, function(data){
			$scope.topicCount = data;
	})
	//get count of posts
	dashboardFactory.getPostsCount($scope.person, function(data){
		$scope.postCount = data;
	})
	//get count of comments
	dashboardFactory.getCommentsCount($scope.person, function(data){
		$scope.commentCount = data;
	})
	// $scope.getCounts = function(name){
	// 	var info = {};
	// 	info.name = name;
	// 	dashboardFactory.setTopicsCount(info, function(){
	// 		dashboardFactory.getTopicsCount(function(data){
	// 			console.log(data);
	// 			$scope.topicCount = data;
				// $scope.$digest()
	// 		})
	// 	})
	// }
})
//topicsController
myApp.controller('topicsController', function($scope,$routeParams,dashboardFactory){
	//get post by id
	$scope.topic_id = $routeParams.topicId;
	dashboardFactory.getTopic($scope.topic_id, function(data){
		$scope.topic = data;
	})
	dashboardFactory.getUserName(function(data){
		$scope.userName = data;
		// console.log("username", $scope.userName);
	})
	// get and add posts methods
	dashboardFactory.getPosts(function(data){
		$scope.posts = data;
		})
	dashboardFactory.getComments(function(data){
		$scope.comments = data;
		})
	$scope.addPost = function(newPost){
		var id = document.getElementById('topic_id').value;
		newPost.topic_id = id;
		newPost.name = $scope.userName;  
		dashboardFactory.addPost(newPost, function(){
			dashboardFactory.getPosts(function(data){
			$scope.posts = data;
			})
			$scope.newPost = {};
		})
	}
	$scope.addComment = function(newComment, someid){
		newComment.post_id = someid;
		newComment.name = $scope.userName;
		dashboardFactory.addComment(newComment, function(){
			dashboardFactory.getComments(function(data){
				$scope.comments = data;
			})
		})
		$scope.newComment = {};
	}
	$scope.upvote = function(id){
		var someid = {id: id};
		dashboardFactory.upvote(someid, function(){
		})
		dashboardFactory.getPosts(function(data){
			$scope.posts = data;
			})
	}
	$scope.downvote = function(id){
		var someid = {id: id};
		dashboardFactory.downvote(someid, function(){
		})
		dashboardFactory.getPosts(function(data){
			$scope.posts = data;
			})
	}

})
