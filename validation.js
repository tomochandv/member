var store = require('store')
const loginYn = store.get('adminUser') == null ? false : true
let login = {
  name : store.get('adminUser').uname,
  email : store.get('adminUser').email
}

// if(loginYn){
//   login.name = 'a',
//   login.email = 'aaa@aaa.net'
// }

module.exports = login