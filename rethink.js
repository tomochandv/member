const config = require('./config')
const r = require('rethinkdbdash')({
  db : config.rethink.db,
  host: config.rethink.host,
  port: config.rethink.port, 
  user : config.rethink.user,
  password : config.rethink.password
})

module.exports = r
