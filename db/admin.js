const config = require('../config')
const r = require('../rethink')
const security = require('../security')

var admin = {
  login : async function(email, pwd){
    const result = await r.table('admin').filter({'email': email, 'pwd' : pwd}).run()
    return result.length
  }
}

module.exports = admin