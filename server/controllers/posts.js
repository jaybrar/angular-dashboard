//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Post = mongoose.model('Post');
// create a controller object to export
module.exports = (function(){
	return{
		show: function(req, res) {
			Post.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var post = new Post({name: req.body.name, text:req.body.text, 
				topic_id:req.body.topic_id, upvote: "0", downvote: "0"});
			post.save(function(err){
				if(err){
					console.log("error adding post");
				}else {
					res.end();
				}
			})
		},
		count: function(req, res){
			Post.find({topic_id:req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results.length);
					// console.log(results.length);
				}
			})
		},
		get_count: function(req, res){
			console.log("loggind user name",req.params.id);
			Post.find({name:req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results.length);
					console.log("posts", results.length);
				}
			})
		},
		upvote: function(req, res){
			Post.update({_id:req.body.id}, {$inc:{upvote:+1}}, function(err, post){
				if(err){
					console.log(err)
				}else{
					res.end();
				}
			})
		},
		downvote: function(req, res){
			Post.update({_id:req.body.id}, {$inc:{downvote:+1}}, function(err, post){
				if(err){
					console.log(err)
				}else{
					res.end();
				}
			})
		}
		
	}
})();