const express = require('express');
const router = express.Router();
let covid19Model = require('../models/covid19');
const crawler = require('../crawler');
crawler();
setInterval(() => {
  crawler();
}, 300000)

router.get('/', function (req, res, next) {
  res.redirect('/api');
});

router.get('/api', function (req, res, next) {
  covid19Model.findOne({ success: true }, function (err, covid19) {
    if (covid19) {
      let { vietnam, global } = covid19;
      let data = { vietnam, global };
      res.send({ success: true, data });
    }
  })
});

module.exports = router;