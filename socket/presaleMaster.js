const presaleMaster = require('../db/presaleMaster')
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('presaleMaster socket connected')
    //프리세일 마스터 관련
    socket.on('presaleMasterList', (data) => {
      presaleMaster.list(data.title, data.useYn, data.page).then(result =>{
        io.emit('presaleMasterListResult', result)
      })
    })
    socket.on('presaleMasterInsert', (data) => {
      if(data.id == ''){
        presaleMaster.insert(data).then(result =>{
          io.emit('presaleMasterInsertResult', result)
        })
      }
      else{
        presaleMaster.update(data).then(result =>{
          io.emit('presaleMasterInsertResult', result)
        })
      }
    })
    socket.on('presaleMasterDetail', (data) => {
      presaleMaster.detail(data.id).then(result =>{
        io.emit('presaleMasterDetailResult', result)
      })
    })
  })
}