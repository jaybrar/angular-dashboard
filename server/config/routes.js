var topics = require("../controllers/topics.js");
var posts = require("../controllers/posts.js");
var comments = require("../controllers/comments.js");
module.exports = function(app){
	var username;
	app.post('/add_username', function(req, res){
		username = req.body.name;
		res.end();
	})
	app.get('/username', function(req, res){
		res.json(username);
	})
	app.get('/topic/:id', function(req, res){
		// console.log(req.params.id);
		topics.showTopic(req, res);
	})
	app.get('/topics', function(req, res){
		topics.show(req, res);
	})
	app.post('/add_topic', function(req, res){
		topics.add(req, res);
	})
	app.get('/posts', function(req, res){
		posts.show(req, res);
	})
	app.post('/add_post', function(req, res){
		posts.add(req, res);
	})
	app.get('/comments', function(req, res){
		comments.show(req, res);
	})
	app.post('/add_comment', function(req, res){
		comments.add(req, res);
	})
	app.get('/count/:id', function(req, res){
		posts.count(req, res);
	})
	app.get('/topic_count/:id', function(req, res){
		topics.get_count(req, res);
	})
	app.get('/post_count/:id', function(req, res){
		posts.get_count(req, res);
	})
	app.get('/comment_count/:id', function(req, res){
		comments.get_count(req, res);
	})
	app.post('/upvote', function(req, res){
		posts.upvote(req, res);
	})
	app.post('/downvote', function(req, res){
		posts.downvote(req, res);
	})
};