// require mongoose adn connnect it to db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create the post schema
var topicSchema = new mongoose.Schema({
	category: { type: String, required: true },
	topic: { type: String, required: true },
	username: { type: String, required: true },
	description: { type: String, required: true }
});
//connnect your collection and model schemam
mongoose.model('Topic', topicSchema);
