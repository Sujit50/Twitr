var express = require('express');
var router = express.Router();
var path = require('path');

var IndexController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', IndexController.getAllPosts);

router.post('/twit', IndexController.savePosts);
router.put('/twit', IndexController.editPosts);
router.delete('/twit/:id', IndexController.deletePosts);

module.exports = router;
