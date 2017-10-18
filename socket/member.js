const member = require('../db/member')
module.exports = function(socket, io) {
  const socketId = socket.id
  // 회원관련
  socket.on('memberInsert', (data) => {
    member.insert(data).then(result =>{
      io.to(socketId).emit('memberInsertResult', result)
    })
  })
  socket.on('memberCheck', (email) => {
    member.checkEmail(email).then(result =>{
      io.to(socketId).emit('memberCheckResult', result)
    })
  })
  socket.on('memberList', (data) => {
    member.list(data.name, data.email, data.auth, data.tell, data.page).then(result =>{
      console.log(socketId)
      io.to(socketId).emit('memberListResult', result)
    })
  })
  socket.on('memberAuth', (data) =>{
    member.auth(data.id, data.status == 'Y' ? true : false).then(result =>{
      const obj = {
        result : result,
        id : data.id
      }
      io.to(socketId).emit('memberAuthResult', obj)
    })
  })
  socket.on('login', (data) =>{
    member.login(data).then(result =>{
      io.to(socketId).emit('loginResult', result)
    })
  })
}