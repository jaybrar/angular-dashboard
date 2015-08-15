// require mongoose adn connnect it to db
var mongoose = require('mongoose');
// create the post schema
var Schema = mongoose.Schema;
var postSchema = new mongoose.Schema({
	name: String,
	text: String,
	created_at: {type: Date, default: new Date},
	topic_id: String,
	upvote: Number,
	downvote: Number
});
// create the commetn schema
var commentSchema = new mongoose.Schema({
	name: String,
	text: String,
	created_at: {type: Date, default: new Date},
	post_id: String
});
// validations
//connnect your collection and model schemam
mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);