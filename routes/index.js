const express = require('express');
const router = express.Router();
const crawler = require('../crawler');
crawler();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;