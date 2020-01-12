var express = require('express');
const sql = require('../sql')
const Comment = require('../sql/collection/comments')
const User = require('../sql/collection/users')
const uuid = require('node-uuid');
const utils = require('./../utils');
var router = express.Router();

// 获取评论信息列表
router.get('/', function(req, res, next) {
  let { proid } = req.query;
  let arr = []
  let comment = []
  // 内部包含用户的信息，通过用户id 获取到所有的用户名，对应的相关评论，拼接数据
  sql.find(Comment, { proid }, { _id: 0 }).then(data => {
    comment = data
    var promises = data.map((item, index) => {
        return sql.find(User, { userid: item.userid }, { _id: 0 })
    })
    return Promise.all(promises)
  }).then(list => {
    console.log('comment', comment)
    console.log('list', list)
    list.map((item,index) => {
      arr.push({
        commentid: comment[index].commentid,
        username: item[0].username,
        note: comment[index].note,
        rating: comment[index].rating
      })
    })
    res.send({
      code: '200',
      data: arr
    })
  })
});

router.post('/add', (req, res, next) => {
  let { userid, proid, rating, note } = req.body;
  rating = rating * 1 || 5
  sql.insert(Comment, {
    commentid: 'comment_' + uuid.v1(),
    userid, proid, rating, note 
  }).then(() => {
    res.send(utils.commentsuccess)
  })
})

module.exports = router;
