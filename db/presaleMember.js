const config = require('../config')
const r = require('../rethink')

var presaleMember = {
  insert : async function(data){
    const result = await r.table('presaleMember').insert(data).run()
    return result.inserted
  },
  findMember: async function(email, id){
    const list = await r.table('presaleMember').filter({'member': {'email':email}, 'master': {'id': id} }).count().run()
    return list
  },
  masterGroupList: async function(){
    const list = await r.table('presaleMember').group('master').count().ungroup()
    return list
  },
  list: async function(id, page, row){
    const startPage = (page - 1) * row
    const endPage = row
    const list = await r.table('presaleMember').filter({ 'master': {'id': id} }).orderBy(r.desc('regDate')).skip(startPage).limit(endPage)
    const totalCount = await r.table('presaleMember').filter({ 'master': {'id': id} }).count().run()
    const sum = await r.table('presaleMember').filter({ 'master': {'id': id} }).group('master').sum('qty').run()
    const json = {
      total: totalCount,
      data: list,
      page: page,
      sum: sum
    }
    return json
  }
}

module.exports = presaleMember