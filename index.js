const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const session = require('express-session')
const redisStore = require("connect-redis")(session)
const bodyParser = require('body-parser')

const security = require('./security')
const routes = require('./route')
const config = require('./config')


app.use(express.static(__dirname + '/views/'))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var sessionMiddleware = session({
  //store: new redisStore(), // XXX redis server config
  secret: "keyboard cat",
})
io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
})
app.use(sessionMiddleware)

app.use('/', routes)

app.set('views', './views')          
app.set('view engine', 'ejs')

require('./socket/member')(io)
require('./socket/presaleMaster')(io)
require('./socket/presaleMember')(io)
require('./socket/admin')(io)

http.listen(config.port, () => {
    console.log('App listening on port 3000')
})






