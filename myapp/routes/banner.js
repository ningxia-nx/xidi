var express = require('express');
const sql = require('./../sql')
const Banner = require('./../sql/collection/banners')
var router = express.Router();

// 获取轮播图
router.get('/', function(req, res, next) {
  // 依据类型查询相关的轮播图数据
  let { type } = req.query
  type = type || 'home'
  sql.find(Banner, { type }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '获取轮播图数据成功',
      data: data
    })
  })
});

module.exports = router;
