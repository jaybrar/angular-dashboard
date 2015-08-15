//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Topic = mongoose.model('Topic');
// create a controller object to export
module.exports = (function(){
	return{
		show: function(req, res) {
			Topic.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		showTopic: function(req, res) {
			Topic.find({_id:req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var topic = new Topic({category: req.body.category, topic:req.body.topic, 
				username:req.body.name, description: req.body.description});
			topic.save(function(err){
				if(err){
					console.log(err);
					res.json(err);
				}else {
					res.end();
				}
			})
		},
		remove: function(req, res){
			Topic.remove({_id: req.body._id}, function(err, topics){
				if(err){
					console.log("error deleting topic");
				}else {
					res.end();
				}
			})
		},
		get_count: function(req, res){
			console.log("params", req.params.id);
			Topic.find({username:req.params.id}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results.length);
					console.log("length",results.length);
				}
			})
		}
	}
})();