const presaleMaster = require('../db/presaleMaster')
module.exports = function(socket, io) {
  const socketId = socket.id
  //프리세일 마스터 관련
  socket.on('presaleMasterList', (data) => {
    presaleMaster.list(data.title, data.useYn, data.page).then(result =>{
      io.to(socketId).emit('presaleMasterListResult', result)
    })
  })
  socket.on('presaleMasterInsert', (data) => {
    if(data.id == ''){
      presaleMaster.insert(data).then(result =>{
        io.to(socketId).emit('presaleMasterInsertResult', result)
      })
    }
    else{
      presaleMaster.update(data).then(result =>{
        io.to(socketId).emit('presaleMasterInsertResult', result)
      })
    }
  })
  socket.on('presaleMasterDetail', (data) => {
    presaleMaster.detail(data.id).then(result =>{
      io.to(socketId).emit('presaleMasterDetailResult', result)
    })
  })
}