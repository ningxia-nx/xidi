const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

const orderSchema = new Schema({
  orderid: {type: String },
  userid: { type: String },
  status: { type: Number }, // 订单状态 0 待付款 1 待收货（已支付） 2 待评价 3 全部订单
  name: { type: String }, // 收货人
  tel: { type: String }, // 手机
  address: { type: String }, // 地址
  note: { type: String }, // 备注
  list: { type: Array }
})

module.exports = mongoose.model('Order', orderSchema);
