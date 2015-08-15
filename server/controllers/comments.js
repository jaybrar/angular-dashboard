//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Comment = mongoose.model('Comment');
// create a controller object to export
module.exports = (function(){
	return{
		show: function(req, res) {
			Comment.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var comment = new Comment({name: req.body.name, text:req.body.text, 
				post_id:req.body.post_id});
			comment.save(function(err){
				if(err){
					console.log("error adding post");
				}else {
					res.end();
				}
			})
		},
		get_count: function(req, res){
			Comment.find({name:req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results.length);
					console.log("comments", results.length);
				}
			})
		}
		
	}
})();