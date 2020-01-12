const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计用户表的集合
const bannerSchema = new Schema({ // 设计用户集合的字段以及数据类型
  bannerid: {type: String },
  type: { type: String }, // 首页、分类、活动....
  img: { type: String },
  href: { type: String }
})

module.exports = mongoose.model('Banner', bannerSchema);
