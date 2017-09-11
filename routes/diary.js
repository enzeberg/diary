const express = require('express');

var diaryModel = require('../models/Diary');
var router = express.Router();

// router.get('/:title', (req, res, next) => {

//   let diaryTitle = req.params.title;
//   diaryModel.findOne({title: diaryTitle}, (err, doc) => {
//     if (err) {
//      next(err);
//     }
//     if (doc) {
//       console.log('doc found: ', doc)
//       res.render('diary_details', {diary: doc});
//     } else {
//       res.send(404);
//     }
//   });
  
// });

router.get('/', (req, res, next) => {
  diaryModel.findOne({_id: req.query.id}, (err, doc) => {
    if (err) {
      next(err);
    }
    if (doc) {
      console.log('doc found: ', doc);
      res.render('diary_details', {diary: doc});
    } else {
      res.send(404);
    }
  });
});

// router.delete('/:title', (req, res, next) => {
//   let diaryTitle = req.params.title;
//   diaryModel.remove({title: diaryTitle}, (err) => {
//     if (err) {

//       next(err);
//     } else {
//       // res.redirect('/') // => DELETE http://localhost:3000/ 404 (Not Found)
//       // res.send('removed successfully.')
//       let retStatus = 'Success';
//       res.send({
//         retStatus: 'Success',
//         redirectTo: '/',
//         message: `DELETE /diary/${diaryTitle} successfully.`
//       });
//     }
//   });
// });

router.delete('/', (req, res, next) => {
  const id = req.query.id;
  diaryModel.remove({_id: id}, (err) => {
    if (err) {
      next(err);
    } else {
      // res.redirect('/') // => DELETE http://localhost:3000/ 404 (Not Found)
      // res.send('removed successfully.')
      res.send({
        retStatus: 'Success',
        redirectTo: '/',
        message: `DELETE /diary/?id=${id} successfully.`
      });
    }
  });
});

router.get('/edit/', (req, res, next) => {
  diaryModel.findOne({_id: req.query.id}, (err, doc) => {
    if (err) {
      next(err);
    }
    if (doc) {
      res.render('new_or_edit_diary', {pageTitle: 'Edit diary', diary: doc})
    } else {
      res.send(404);
    }
  });
});

router.post('/edit/', (req, res, next) => {
  const update = {
    title: req.body.title || 'untitled',
    text: req.body.text
  };
  diaryModel.findByIdAndUpdate(req.query.id, update, (err, diary) => {
    if (err) {
      next(err);
    }
    if (diary) {
      res.send({
        retStatus: 'Success',
        redirectTo: `/diary/?id=${diary.id}`
      });
    } else {
      res.send('Update diary failed.');
    }
  });
});

module.exports = router;