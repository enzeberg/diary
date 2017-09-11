const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
  title: String,
  date: String,
  day: String, // 星期几
  weather: String,
  text: String // 正文
});

const diaryModel = mongoose.model('Diary', diarySchema);

module.exports = diaryModel;