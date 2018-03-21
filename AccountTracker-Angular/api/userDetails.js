var express = require('express');
var router = express.Router();

router.post('/profile', function(req, res){
      res.end(req.body);
});

module.exports = router;