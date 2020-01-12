# 1、后端的接口
> express myapp --view=ejs

> cd myapp

> cnpm i

> cnpm i bcryptjs node-uuid 
mongoose@4 -S

> 修改配置文件 package.json 添加dev指令

> 复制 数据库相关文件，修改用户集合 （userid,username,password,tel）

> 创建数据库 1908shop,修改db.js

# 2、实现用户的注册接口 routes/users.js
```
var User = require('./../sql/collection/users');
var sql = require('./../sql');
var utils = require('./../utils')
var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10); // 加密级别

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
```
# 3、实现登陆功能 routes/users.js

```
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
        // 2.3.3 密码正确
        res.send(utils.loginsuccess)
      } else {
        // 2.3.4 密码错误
        res.send(utils.loginfail)
      }
    }
  })
})
```
# 4、编写登陆注册接口文档
 
api/用户.md

# 5、编写导入excel表格数据

> cnpm i node-xlsx -S

## 5.1 创建产品的集合 sql/collection/pros.js
```
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

```

## 5.2 添加产品的相关路由
routes/pro.js  + app.js 注册路由

## 5.3 导入功能   ---   只需要一次即可

routes/pro.js
```
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
```

# 6、查询产品数据
```
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
```

# 7、查询产品的接口文档

api/产品.md

# 8、获取产品的类型接口

## 8.1 封装获取类型的数据库 sql/index.js
```
distinct(CollectionName, name) {
  return new Promise((resolve, reject) => {
    CollectionName.distinct(name).exec((err, data) => {
      if (err) throw err;
      resolve(data)
    })
  })
}
```
## 8.2 获取分类接口 routes/pro.js
```
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
```

## 8.3 接口文档 api/产品.md

# 9、加入购物车业务逻辑

routes/cart.js + app.js

## 9.1 设计购物车的集合 sql/collection/carts.js

## 9.2 加入购物车接口
```
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
```

## 9.3 编写接口文档
api/购物车.md

# 10、实现查询购物车接口
```
// 查询购物车数据  ---- 依据用户id获取购物车的数据，依据 产品id获取产品的信息，然后组合数据，输出数据
router.get('/', function(req, res, next) {
  // 1、获取用户id
  let { userid } = req.query;
  // 2、依据用户id查询购物车的数据
  sql.find(Cart, { userid }, { _id: 0 }).then(data => {
    // 如果没有数据，告诉用户没有数据
    if (data.length === 0) {
      // 2.1 没有数据
      res.send(utils.cartnull)
    } else {
      // 2.2  有数据,遍历数据，获取数据的基本信息，组合数据
      let arr = []
      new Promise(resolve => { // 2.2.1内含异步操作
        data.map((item, index) => { // 2.2.2遍历数据
          // 2.2.3 依据产品的id查询数据的相关信息
          sql.find(Pro, { proid: item.proid }, { _id: 0 }).then(data1 => {
            // console.log(data1)
            // 2.2.4 组合数据
            arr.push({
              cartid: item.cartid,
              userid: userid,
              proid: item.proid,
              proname: data1[0].proname,
              proimg: data1[0].proimg,
              price: data1[0].price,
              num: item.num
            })
            // 2.2.5 遍历所有的数据结束
            if (index >= data.length - 1) {
              resolve()
            }
          })
        })
      }).then(() => {
        // 2.2.6 返回购物车数据结果
        res.send({
          code: '200',
          message: '获取购物车列表的数据',
          length: arr.length,
          data: arr
        })
      })
      
    }
  })
});
```

* 编写接口文档 api/购物车.md

# 11、删除购物车接口

```
// 删除购物车
router.get('/delete', (req, res, next) => {
  // 1、获取删除的条件
  let { userid, proid } = req.query
  // 2、删除
  sql.delete(Cart, { userid, proid }).then(() => {
    res.send(utils.deletesuccess)
  })
})
```
* 接口文档

# 12、更新购物车数据数量

// 更新购物车
router.get('/update', (req, res, next) => {
  // 1、获取更新的数据
  let { cartid, num } = req.query
  // 2、更新数据
  sql.update(Cart, { cartid }, { $set: { num: num } }).then(() => {
    res.send(utils.updatesuccess)
  })
  
})

# 13、获取产品详情接口

routes/pro.js
```
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

```
接口文档 api/产品.md

# 14、轮播图接口

* 数据库集合 sql/collection/banners.js

* 数据库插入数据
> public/images复制相关图片，myapp/banner.js插入数据
```
const sql = require('./sql')
const Banner = require('./sql/collection/banners')
const uuid = require('node-uuid');

const arr = []

for (var i = 0; i < 6; i++) {
  arr.push({
    bannerid: 'banner_' + uuid.v1(),
    type: 'home',
    img: 'images/' + (i + 1) + '.jpg',
    href: ''
  })
}

sql.insert(Banner, arr)
```

* 编写接口

routes/banner.js + app.js

```
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
```

* 编写接口文档 api/轮播图.md

# 15、评论接口

* 设计评论 数据库集合 sql/collection/comments.js

* routes/comment.js + app.js

* 依据产品id 获取评论信息列表
```
// 获取评论信息列表
router.get('/', function(req, res, next) {
  let { proid } = req.query;
  // 内部包含用户的信息，通过用户id 获取到所有的用户名，对应的相关评论，拼接数据
  sql.find(Comment, { proid }, { _id: 0 }).then(data => {
    let arr = []
    new Promise(resolve => {
      data.map((item, index) => {
        sql.find(User, { userid: item.userid }, { _id: 0 }).then(data1 => {
          arr.push({
            commentid: item.commentid,
            username: data1[0].username,
            note: item.note,
            rating: item.rating
          })
          if (index >= data.length - 1) {
            resolve()
          }
        })
      })
    }).then(() => {
      res.send({
        code: '200',
        message: '查询评论列表',
        data: arr
      })
    })
  })
});
```
* 添加评论信息
```
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

```