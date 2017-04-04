var TwitrModel = require('../models/TwitrModel');

module.exports = {
	getAllPosts: function(req, res, next) {
		TwitrModel.getAllPosts(req, res, function(response) {
			res.render('index', { title: 'Tweet' , data: response.data});
		});
	},

	savePosts: function(req, res, next) {
		TwitrModel.savePost(req.body, function(response) {
			res.render('partials/listPartial', {data: response.data}, function(err, returnHtml) {
				res.send(returnHtml);
			});
		});
	},

	editPosts: function(req, res, next) {
		TwitrModel.updatePost(req.body, function(response) {
			res.send(response);
		});
	},

	deletePosts: function(req, res, next) {
		TwitrModel.deletePost(req.params.id, function(response) {
			res.send(response);
		});
	}
}