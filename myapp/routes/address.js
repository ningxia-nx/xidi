var express = require('express');
var router = express.Router();
var sql = require('./../sql')
var Address = require('./../sql/collection/addresss')
var uuid = require('node-uuid')

/* 地址管理. */
router.get('/', function(req, res, next) {
  let { userid, flag } = req.query
  flag = flag * 1 || 0
  sql.find(Address, { userid, flag }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '30000',
        message: '没有默认地址'
      })
    } else {
      res.send({
        code: '200',
        message: '获取地址',
        data: data
      })
    }
    
  })
});

router.post('/add', (req, res, next) => {
  let { userid, name, tel, address, flag } = req.body
  flag = flag * 1 || 0
  let addressid = 'address_' + uuid.v1()
  sql.insert(Address, { userid, name, tel, address, flag, addressid }).then(() => {
    res.send({
      code: '200',
      message: '添加地址成功'
    })
  })
})
module.exports = router;
