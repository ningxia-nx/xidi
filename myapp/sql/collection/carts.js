const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

const cartSchema = new Schema({ 
  cartid: {type: String },
  userid: { type: String },
  proid: { type: String },
  num: { type: Number }
})

module.exports = mongoose.model('Cart', cartSchema);
