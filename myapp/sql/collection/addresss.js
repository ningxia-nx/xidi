const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 地址集合
const addressSchema = new Schema({ // 地址集合
  addressid: {type: String },
  userid: { type: String },
  name: { type: String },
  tel: { type: String },
  address: { type: String },
  flag: { type: Number } // 是不是默认地址 1 表示默认地址 0 不是默认地址
})

module.exports = mongoose.model('Address', addressSchema);
