var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
	content: String,
	date: {
		type: Date,
		default: Date.now
	},
	hidden: {
		type: Boolean,
		default: false
	},
});

var Posts = mongoose.model('Posts', postsSchema);

module.exports = {
	getAllPosts: function(req, res, next) {
		Posts.find({}).sort({date: -1}).exec(function(err, post) {
			if (err) {
				return next({
					status: 'error',
					message: err
				});
			}
			return next({
				status: 'success',
				data: post
			})
		});
	},

	savePost: function(postData, next) {
		var post = new Posts(postData);
		var promise = post.save();
		promise.then(function(doc) {
			next({
				status: 'success',
				data: doc._doc
			});
		});
	},

	updatePost: function(postData, next) {
		var conditions = {
			_id: postData.pk
		};
		var update = {
			$set: {
				content: postData.value,
				date: new Date()
			}
		};

		Posts.findOneAndUpdate(conditions, update, function(doc) {
			next({
				status: 'success',
				data: doc
			});
		});
	},

	deletePost: function(postData, next) {
		var conditions = {
			_id: postData
		};
		Posts.remove(conditions, function(err) {
			if (err)
				return next({
					status: 'success',
					data: doc
				});

			return next({
				status: 'success',
				data: postData
			});
		});
	}
}