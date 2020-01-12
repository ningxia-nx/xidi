var express = require('express');
var router = express.Router();
var User = require('./../sql/collection/users');
var sql = require('./../sql');
var utils = require('./../utils')
var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10); // 加密级别


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 实现注册接口 -- post提交方式
router.post('/register', (req, res, next) => {
  // 1、先获取表单信息
  let { username, password, tel } = req.body;
  // 2、根据手机号查询 用户集合中是否有该用户，如果有，返回有该账户，如果没有注册继续
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    // 2.1 判断有没有该用户
    if (data.length === 0) {
      // 2.2 没有该用户----继续完成注册操作
      // 2.2.1 生成用户的id
      let userid = 'users_' + uuid.v1();
      // 2.2.2 对密码加密
      password = bcrypt.hashSync(password, salt)
      // 2.2.3 插入数据库
      sql.insert(User, { userid, username, password, tel}).then(() => {
        res.send(utils.registersuccess)
      })
    } else {
      // 2.3 已有该用户
      res.send(utils.registered)
    }
  })
})


// 实现登陆功能
router.post('/login', (req, res, next) => {
  // 1、获取表单信息
  let { tel, password } = req.body;
  // 2、依据手机号查询有没有该用户
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    // 2.1 判断有么有该用户
    if (data.length === 0) {
      // 2.2 没有该用户
      res.send(utils.unregister)
    } else {
      // 2.3 有该用户，验证密码
      // 2.3.1 获取数据库中的密码
      let pwd = data[0].password;
      // 2.3.2 比较 输入的 密码和数据库中的密码
      var flag = bcrypt.compareSync(password, pwd) // 前为输入，后为数据库
      if (flag) {
        // 2.3.3 密码正确,生成token
        let userid = data[0].userid
        let username = data[0].username
        let token = jwt.sign({ userid }, 'daxunxun', {
          // expiresIn: 60*60*24// 授权时效24小时
          expiresIn: 60*60*24*7// 授权时效7天
        })
        res.send({
          code: '10010',
          message: '登陆成功',
          token: token,
          userid,
          username
        })
      } else {
        // 2.3.4 密码错误
        res.send({
          code: '10100',
          message: '密码错误'
        })
      }
    }
  })
})


module.exports = router;
