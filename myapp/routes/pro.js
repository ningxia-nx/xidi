var express = require('express');
var xlsx = require('node-xlsx');
var uuid = require('node-uuid');
var Pro = require('./../sql/collection/pros');
var sql = require('./../sql');
var router = express.Router();
var filestr = '/Users/weilijin/Desktop/git/code/week2-4-vue/day06/myapp/snacks.xlsx';

// 查询产品 --- 分页功能
// pageCode 页码，默认值为0
// limitNum 每页显示个数， 默认值为10
router.get('/', function(req, res, next) {
  // 1、获取前端的查询条件
  let { pageCode, limitNum } = req.query;
  // 2、设置页码和每页显示个数的默认值  ---- 数据类型
  pageCode = pageCode * 1 || 0;
  limitNum = limitNum * 1 || 10;
  // 3、查询数据
  sql.paging(Pro, {}, { _id: 0 }, limitNum, pageCode).then(data => {
    // 4、返回数据
    res.send({
      code: '200',
      success: '查询列表成功',
      length: data.length,
      data: data
    })
  })
});

// 获取产品的详情
router.get('/detail', (req, res, next) => {
  let { proid } = req.query
  sql.find(Pro, { proid }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '查询该数据成功',
      data: data[0]
    })
  })
})

// 实现查询分类以及品牌的接口
router.get('/type', (req, res, next) => {
  // 1、获取字段名 类型 type 品牌 brand,查询数据库
  let { type } = req.query
  type = type || 'type'
  sql.distinct(Pro, type).then(data => {
    res.send({
      code: '200',
      success: '获取类型成功',
      // length: data.length,
      data: data
    })
  })
})

// 实现导入接口
router.get('/import', (req, res, next) => {
  // 1、获取表格信息
  let obj = xlsx.parse(filestr)[0].data
  let arr = []
  // 2、遍历数据 --- 排除第一条数据
  obj.map((item, index) => {
    if (index !== 0) {
      // 3.生成一个产品的id,插入书
      arr.push({
        proid: "pro_" + uuid.v1(),
        type: item[0],
        brand: item[1],
        barndimg: item[2],
        proname: item[3],
        price: item[4],
        flag: item[5], // 是否推荐
        proimg: item[6],
        note: item[7]
      }) 
    }
  })

  // 4、插入数据库
  sql.insert(Pro, arr).then(() => {
    res.send(arr)
  })
  
})

// 获取分类类型对应的品牌
router.get('/category', (req, res, next) => {
  let { type } = req.query
  sql.find(Pro, { type }, {_id: 0, brand:1, barndimg: 1}).then(data => {
    // 数组去重 https://www.cnblogs.com/le220/p/9130656.html
    let obj = {}
    // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    // [{brand: '1', barndimg: '11'}, {brand: '2', barndimg: '22'},{brand: '1', barndimg: '11'}]
    // [{brand: '1', barndimg: '11'}, {brand: '2', barndimg: '22'}]
    data = data.reduce((item, next) => {
      obj[next.brand] ? '' : obj[next.brand] = true && item.push(next)
      return item
    }, [])
    res.send({
      code: '200',
      message: '获取分类类型列表',
      data: data
    })
  })
})

// 获取品牌类型对应的产品
router.get('/brandcategory', (req, res, next) => {
  let { brand } = req.query
  sql.find(Pro, { brand: brand }, {_id: 0}).then(data => {
    
    res.send({
      code: '200',
      message: '获取品牌分类列表',
      data: data
    })
  })
})

// 搜索
router.get('/search', (req, res, next) => {
  let { text } = req.query
  sql.find(Pro, { proname: eval('/' + text + '/') }, {_id: 0}).then(data => {
    
    res.send({
      code: '200',
      message: '搜索列表',
      data: data
    })
  })
})
module.exports = router;
