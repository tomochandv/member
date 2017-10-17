const config = require('../config')
const r = require('../rethink')
const security = require('../security')

var member = {
  insert : async function(data){
    data.pwd = security.Encription(data.pwd)
    const result = await r.table('member').insert(data).run()
    return result.inserted
  },
  checkEmail : async function(email){
    const result = await r.table('member').filter({'email': email}).count().run()
    return result
  },
  list : async function(name, email, auth, tell, page){
    let search = {}
    if(name != '') search['name'] = name
    if(email != '') search['email'] = email
    if(auth != '') search['auth'] = auth == 'true' ? true : false
    if(tell != '') search['tell'] = tell
    const startPage = (page - 1) * config.adminPagingCount 
    const endPage = config.adminPagingCount
    const list = await r.table('member').filter(search).orderBy(r.desc('regDate')).skip(startPage).limit(endPage)
    const totalCount = await r.table('member').filter(search).count().run()
    const json = {
      total : totalCount,
      data : list,
      page: page
    }
    return json
  },
  auth : async function(id, status){
    const result = await r.table('member').get(id).update({auth: status}).run()
    return result
  },
  login : async function(data){
    let result = {
      message : ''
    }
    const user = await r.table('member').filter({'email': data.email}).run()
    if(user.length >0){
      const pwd = security.Decription(user[0].pwd)
      if(data.pwd != pwd){
        result.message = '비밀번호를 확인하세요.'
      }
      else{
        if(user[0].auth){
          result.message = 1
        }
        else{
          result.message = '아직 관리자 인증이 되지 않았습니다.'
        }
      }
    }
    else{
      result.message = '존재 하지 않는 아이디입니다.'
    }
    return result
  },
  detailWithEmail : async function(email){
    const result = await r.table('member').filter({email : email}).run()
    return result
  }
}

module.exports = member
