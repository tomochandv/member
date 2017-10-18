const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const security = require('./security')
const routes = require('./route')
const config = require('./config')

app.use(express.static(__dirname + '/views/'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

require('./route')(app)

app.set('views', './views')          
app.set('view engine', 'ejs')

require('./socket/member')(io)
require('./socket/presaleMaster')(io)
require('./socket/presaleMember')(io)
require('./socket/admin')(io)
require('./socket/token')(io)

http.listen(config.port, () => {
    console.log('App listening on port 3000')
})






