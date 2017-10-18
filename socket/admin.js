const admin = require('../db/admin')
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('admin socket connected')

    socket.on('adminLogin', (data) => {
      admin.login(data.email, data.pwd).then(result =>{
        io.emit('adminLoginResult', result)
      })
    })
    
  })
}






