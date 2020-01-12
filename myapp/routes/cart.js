var express = require('express');
var sql = require('./../sql');
var Cart = require('./../sql/collection/carts');
var Pro = require('./../sql/collection/pros');
var uuid = require('node-uuid');
var utils = require('./../utils')
var router = express.Router();

// 查询购物车数据  ---- 依据用户id获取购物车的数据，依据 产品id获取产品的信息，然后组合数据，输出数据
// router.get('/', function(req, res, next) {
//   // 1、获取用户id
//   let { userid } = req.query;
//   // 2、依据用户id查询购物车的数据
//   sql.find(Cart, { userid }, { _id: 0 }).then(data => {
//     // 如果没有数据，告诉用户没有数据
//     if (data.length === 0) {
//       // 2.1 没有数据
//       res.send(utils.cartnull)
//     } else {
//       // 2.2  有数据,遍历数据，获取数据的基本信息，组合数据
//       let arr = []
//       new Promise(resolve => { // 2.2.1内含异步操作
//         data.map((item, index) => { // 2.2.2遍历数据
//           // 2.2.3 依据产品的id查询数据的相关信息
//           sql.find(Pro, { proid: item.proid }, { _id: 0 }).then(data1 => {
//             // console.log(data1)
//             // 2.2.4 组合数据
//             arr.push({
//               cartid: item.cartid,
//               userid: userid,
//               proid: item.proid,
//               proname: data1[0].proname,
//               proimg: data1[0].proimg,
//               price: data1[0].price,
//               num: item.num
//             })
//             // 2.2.5 遍历所有的数据结束
//             if (index >= data.length - 1) {
//               resolve()
//             }
//           })
//         })
//       }).then(() => {
//         // 2.2.6 返回购物车数据结果
//         res.send({
//           code: '200',
//           message: '获取购物车列表的数据',
//           length: arr.length,
//           data: arr
//         })
//       })
      
//     }
//   })
// });

router.get('/', function(req, res, next) {
  // 1、获取用户id
  let { userid } = req.query;
  let cartarr = []
  // 2、依据用户id查询购物车的数据
  sql.find(Cart, { userid }, { _id: 0 }).then(data => {
    // 如果没有数据，告诉用户没有数据
    if (data.length === 0) {
      // 2.1 没有数据
      res.send(utils.cartnull)
    } else {
      cartarr = data
      let promise1 = data.map(item => {
        return sql.find(Pro, { proid: item.proid}, { _id: 0})
      })
      return Promise.all(promise1)
    }
  }).then(list => {
    console.log('list', list)
    console.log('cartarr', cartarr)
    let arr = []
    list.map((item, index) => {
      arr.push({
        proid: item[0].proid,
        proname: item[0].proname,
        proimg: item[0].proimg,
        price: item[0].price,
        cartid: cartarr[index].cartid,
        userid: cartarr[index].userid,
        num: cartarr[index].num
      })
    })
    res.send({
      code: '200',
      data: arr
    })
  })
});

// router.get('/', function(req, res, next) {
//   // 1、获取用户id
//   let { userid } = req.query;
//   let cart = []
//   let arr = []
//   // 2、依据用户id查询购物车的数据
//   sql.find(Cart, { userid }, { _id: 0 }).then(data => {
//     // 如果没有数据，告诉用户没有数据
//     if (data.length === 0) {
//       // 2.1 没有数据
//       res.send(utils.cartnull)
//     } else {
//       // 2.2  有数据,遍历数据，获取数据的基本信息，组合数据
//       cart = data
//       var promises = data.map(item => {
//         return sql.find(Pro, { proid: item.proid }, { _id: 0 })
//       })
//       return Promise.all(promises)
//     }
//   }).then(list => {
//     console.log('list', list)
//     list.map((item, index) => {
//       arr.push({
//         cartid: cart[index].cartid,
//         userid: userid,
//         proid: item[0].proid,
//         proname: item[0].proname,
//         proimg: item[0].proimg,
//         price: item[0].price,
//         num: cart[index].num
//       })
//     })
//     res.send({
//       code: '200',
//       data: arr
//     })
//   })
// });

// 加入购物车 购物车数据id 产品id 用户id  产品的数量num
router.get('/add', (req, res, next) => {
  // 1、获取数据
  let { userid, proid, num } = req.query;
  num = num * 1 || 1 // 设定默认数量
  // 2、加入购物车 
  // 如果当前用户的购物车中有这个产品，数量加1，否则加入
  sql.find(Cart, { userid, proid }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // 2.1没有改数据 --- 插入数据库操作
      sql.insert(Cart, {
        cartid: 'cart_' + uuid.v1(),
        userid,
        proid,
        num
      }).then(() => {
        res.send({
          code: '200',
          message: '加入购物车成功'
        })
      })
    } else {
      // 2.2更新数据库中购物车产品的数量
      sql.update(Cart, { userid, proid }, { $inc: { num: 1 } }).then(() => {
        res.send({
          code: '200',
          message: '加入购物车成功'
        })
      })
    }
  })
})

// 删除购物车
router.get('/delete', (req, res, next) => {
  // 1、获取删除的条件
  let { userid, proid } = req.query
  // 2、删除
  sql.delete(Cart, { userid, proid }).then(() => {
    res.send(utils.deletesuccess)
  })
})

// 更新购物车
router.get('/update', (req, res, next) => {
  // 1、获取更新的数据
  let { cartid, num } = req.query
  // 2、更新数据
  sql.update(Cart, { cartid }, { $set: { num: num } }).then(() => {
    res.send(utils.updatesuccess)
  })
  
})
module.exports = router;
