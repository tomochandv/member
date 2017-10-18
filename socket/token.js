const token = require('../db/token')
const moment = require('moment')

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('token socket connected')
    socket.on('token', (data) => {
      require('../validation')(data).then(function(result){
        io.emit('tokenResult', result)
      })
    })
  })
}
