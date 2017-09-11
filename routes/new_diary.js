const express = require('express');
const stringifyDate = require('../my_modules/date_stringify');

var diaryModel = require('../models/Diary');
var router = express.Router();

const dayMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

router.get('/', (req, res, next) => {
  res.render('new_or_edit_diary', {pageTitle: 'New diary'});
});

router.post('/', (req, res, next) => {
  // console.log('req.body: ', req.body)
  const date = new Date();
  const diary = {
    title: req.body.title.trim().replace(/\s/g, '-') || 'untitled',
    date: stringifyDate(date, '/'),
    day: dayMap[date.getDay()],
    weather: req.body.weather,
    text: req.body.text
  }
  console.log(diary);
  // res.send(diary)
  diaryModel.create(diary, (err, doc) => {
    if (err) {
      next(err);
    }
    if (doc) {
      // res.render('/diary/${title}', {diary: diary});
      // res.render('diary_details', {diary: diary});
      // res.redirect(`/diary/${diary.title}`)
      // return res.redirect('/')
      let retStatus = 'Success';
      res.send({
        retStatus: retStatus,
        redirectTo: `/diary/?id=${doc.id}`
      });
    } else {
      res.send('Add diary failed.');
    }
  });
});

module.exports = router;