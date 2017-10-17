const member = require('../db/member')
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('member socket connected')
    // 회원관련
    socket.on('memberInsert', (data) => {
      member.insert(data).then(result =>{
        io.emit('memberInsertResult', result)
      })
    })
    socket.on('memberCheck', (email) => {
      member.checkEmail(email).then(result =>{
        io.emit('memberCheckResult', result)
      })
    })
    socket.on('memberList', (data) => {
      member.list(data.name, data.email, data.auth, data.tell, data.page).then(result =>{
        io.emit('memberListResult', result)
      })
    })
    socket.on('memberAuth', (data) =>{
      member.auth(data.id, data.status == 'Y' ? true : false).then(result =>{
        const obj = {
          result : result,
          id : data.id
        }
        io.emit('memberAuthResult', obj)
      })
    })
    socket.on('login', (data) =>{
      member.login(data).then(result =>{
        io.emit('loginResult', result)
      })
    })
  })
}