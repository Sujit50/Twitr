var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/twit', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
