const token = require('../db/token')
const moment = require('moment')

module.exports = function(socket, io) {
    const socketId = socket.id
    socket.on('token', (data) => {
      require('../validation')(data).then(function(result){
        io.to(socketId).emit('tokenResult', result)
      })
    })
}
