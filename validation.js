const token = require('./db/token')
const moment = require('moment')

async function checktoken(tokenId){
  let data = {
    result: false,
    email:'',
    type: 'U'
  }
  if(tokenId !=null && tokenId != ''){
    const tokenResult = await token.select(tokenId)
    const now = moment().format()
    const ex_date = moment(tokenResult[0].exDate)
    if(ex_date.isAfter(now)){
      data.result = true,
      data.email = tokenResult[0].email,
      data.type = tokenResult[0].type
    }
  }
  return data
}

module.exports = checktoken
