const socketio = require('socket.io')
const server = require('./server')
const io = socketio(server)

let player1 = null
let player2 = null

io.on('connection', socket => {
  console.log(`A new client has connected with ID# ${socket.id}`)
  socket.on('playerReady', () => {
    console.log('a new player is ready!')
    if (!player1) {
      player1 = socket.id
      console.log(`Player 1: ${player1}`)
      return
    }
    if (player1 && !player2) {//
      player2 = socket.id
      console.log(`Player 2: ${player2}`)
      io.to(player1).emit('bothReady', player2)
      io.to(player2).emit('bothReady', player1)
      console.log("a 'bothReady' event has been emitted to both players")
    }
  })
  socket.on('updateOtherPlayer', payload => {
    socket.broadcast.emit('updateOtherPlayer', payload)
  })
})

