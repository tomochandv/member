const config = require('../config')
const r = require('../rethink')
const security = require('../security')
const uuidV4 = require('uuid/v4')
const moment = require('moment')
const token = require('./token')

var admin = {
  login : async function(email, pwd){
    let result = {
      message : ''
    }
    const data = await r.table('admin').filter({'email': email, 'pwd' : pwd}).run()
    if(data.length > 0){
      const tokenId = uuidV4()
      const tokenData = {
        token: tokenId
        ,email: data.email
        ,genDate: moment().format()
        ,exDate: moment().add(1, 'hour').format()
        ,type:'A'
      }
      token.insert(tokenData)
      result.message = 1
      result.token = tokenId
    }
    return result
  }
}

module.exports = admin