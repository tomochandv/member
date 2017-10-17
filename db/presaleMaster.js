const config = require('../config')
const r = require('../rethink')

var presaleMaster = {
  insert : async function(data){
    const result = await r.table('presaleMaster').insert(data).run()
    return result.inserted
  },
  list : async function(title, use, page){
    let search = {}
    if(title != '') search['title'] = title
    if(use != '') search['use'] = use == 'true' ? true : false
    const startPage = (page - 1) * config.adminPagingCount 
    const endPage = config.adminPagingCount
    const list = await r.table('presaleMaster').filter(search).orderBy(r.desc('regDate')).skip(startPage).limit(endPage)
    const totalCount = await r.table('presaleMaster').filter(search).count().run()
    const json = {
      total : totalCount,
      data : list,
      page: page
    }
    return json
  },
  detail : async function(id){
    return await r.table('presaleMaster').get(id).run()
  },
  update : async function(data){
    const result = await r.table('presaleMaster').get(data.id).update({
      title: data.title, qty: data.qty, coin: data.coin, desc: data.desc, use: data.use}).run()
    return result
  }
}

module.exports = presaleMaster