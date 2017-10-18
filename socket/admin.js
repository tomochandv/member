const admin = require('../db/admin')
module.exports = function(socket, io) {
  const socketId = socket.id

  socket.on('adminLogin', (data) => {
    admin.login(data.email, data.pwd).then(result =>{
      io.to(socketId).emit('adminLoginResult', result)
    })
  })
}






