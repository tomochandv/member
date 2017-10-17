const presaleMamber = require('../db/presaleMember')
const presaleMaster = require('../db/presaleMaster')
const member = require('../db/member')
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('presaleMemeber socket connected')
    //프리세일 맴버
    socket.on('presaleMamberInsert', (data) => {
      Promise.all([presaleMaster.detail(data.id), member.detailWithEmail(socket.request.session.email)]).then(values =>{
        const remadeData = {
          master: values[0],
          member: values[1][0],
          qty: data.qty,
          addr: data.addr,
          regDate: data.regDate
        }
        presaleMamber.insert(remadeData).then(result =>{
          io.emit('presaleMemberInsertResult', result)
        })
      })
    })
    socket.on('presaleMemberCheck', (data)=>{
      presaleMamber.findMember(socket.request.session.email, data.id).then(result=>{
        io.emit('presaleMemberCheckResult', result)
      })
    }),
    socket.on('presaleMemberGroup', ()=>{
      presaleMamber.masterGroupList().then(result=>{
        io.emit('presaleMemberGroupResult', result)
      })
    })
    socket.on('presaleMemberList', (data) => {
      presaleMamber.list(data.id, data.page, data.row).then(result =>{
        io.emit('presaleMemberListResult', result)
      })
    })
  })
}