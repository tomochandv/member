const config = require('../config')
const r = require('../rethink')

var token = {
  insert : async function(data){
    const result = await r.table('token').insert(data).run()
    return result.inserted
  },
  select: async function(token){
    const list = await r.table('token').filter({'token': token}).run()
    return list
  }
}

module.exports = token