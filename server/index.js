const socketio = require('socket.io')
const server = require('./server')
const io = socketio(server)

io.on('connection', socket => {
  console.log(`A new client has connected with ID# ${socket.id}`)
})