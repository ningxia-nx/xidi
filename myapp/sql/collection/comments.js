const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计用户表的集合
const commentSchema = new Schema({ // 设计用户集合的字段以及数据类型
  commentid: {type: String },
  userid: { type: String },
  proid: { type: String },
  note: { type: String },
  rating: { type: Number }
})

module.exports = mongoose.model('Comment', commentSchema);
