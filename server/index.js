const socketio = require('socket.io')
const server = require('./server')
const io = socketio(server)

io.on('connection', socket => {
  console.log(`A new client has connected with ID# ${socket.id}`)
})

io.on('playerReady', socket => {
  if (!player1) player1 = socket.id
  if (player1 && !player2) player2 = socket.id
  if (player1 && player2) {
    socket.to(player1).emit('bothReady', player2)
    socket.to(player2).emit('bothReady', player1)
  }
})