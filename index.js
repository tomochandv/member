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

io.on('connection', function(socket) {
    console.log('socket connected~!!')
    require('./socket/token')(socket, io)
    require('./socket/member')(socket, io)
    require('./socket/presaleMaster')(socket, io)
    require('./socket/presaleMember')(socket, io)
    require('./socket/admin')(socket, io)
})

http.listen(config.port, () => {
    console.log('App listening on port 3000')
})






