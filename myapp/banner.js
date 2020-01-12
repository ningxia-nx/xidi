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