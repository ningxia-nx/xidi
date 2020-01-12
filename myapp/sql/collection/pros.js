const mongoose = require('./../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计用户表的集合
const proSchema = new Schema({ // 设计用户集合的字段以及数据类型
  proid: {type: String },
  type: { type: String },
  brand: { type: String },
  barndimg: { type: String },
  proname: { type: String },
  price: { type: Number },
  flag: { type: Number }, // 是否推荐
  proimg: { type: String },
  note: { type: String },
})

module.exports = mongoose.model('Pro', proSchema);
