const presaleMamber = require('../db/presaleMember')
const presaleMaster = require('../db/presaleMaster')
const member = require('../db/member')
module.exports = function(socket, io) {
  const socketId = socket.id
  //프리세일 맴버
  socket.on('presaleMamberInsert', (data) => {
    let email = ''
    require('../validation')(data.token).then(function(result){
      email = result.email
    }).then(()=>{
      Promise.all([presaleMaster.detail(data.id), member.detailWithEmail(email)]).then(values =>{
        const remadeData = {
          masterId: data.id,
          master: values[0],
          member: values[1][0],
          qty: data.qty,
          addr: data.addr,
          regDate: data.regDate
        }
        presaleMamber.insert(remadeData).then(result =>{
          io.to(socketId).emit('presaleMemberInsertResult', result)
        })
      })
    })
  })
  socket.on('presaleMemberCheck', (data)=>{
    let email = ''
    require('../validation')(data.token).then(function(result){
      email = result.email
    }).then(()=>{
      presaleMamber.findMember(email, data.id).then(result=>{
        io.to(socketId).emit('presaleMemberCheckResult', result)
      })
    })
  }),
  socket.on('presaleMemberGroup', ()=>{
    presaleMamber.masterGroupList().then(result=>{
      io.to(socketId).emit('presaleMemberGroupResult', result)
    })
  })
  socket.on('presaleMemberList', (data) => {
    presaleMamber.list(data.id, data.page, data.row).then(result =>{
      io.to(socketId).emit('presaleMemberListResult', result)
    })
  })
  socket.on('presaleMemberDelete', (data) => {
    presaleMamber.delete(data.id).then(result =>{
      io.to(socketId).emit('presaleMemberDeleteResult', result)
    })
  })
}