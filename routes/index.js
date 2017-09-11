const express = require('express');

var diaryModel = require('../models/Diary');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  diaryModel.find({}, (err, docs) => {
    if (err) {
      next(err);
    }
    res.render('index', {diaries: docs}); 
  });
});

router.delete('/', (req, res, next) => {
  diaryModel.remove({}, (err) => {
    if (err) {
      next(err);
    }
    res.send({
      retStatus: 'Success',
      redirectTo: '/',
      message: 'Delete all successfully.'
    });
  });
});

module.exports = router;
