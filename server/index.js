const socketio = require('socket.io')
const server = require('./server')
const io = socketio(server)

io.on('connection', socket => {
  console.log(`A new client has connected with ID# ${socket.id}`)
})

let player1 = null
let player2 = null

io.on('playerReady', socket => {
  if (!player1) {
    player1 = socket.id
    console.log(`Player 1: ${player1}`)
  }
  if (player1 && !player2) {
    player2 = socket.id
    console.log(`Player 2: ${player2}`)
  }
  if (player1 && player2) {
    socket.to(player1).emit('bothReady', player2)
    socket.to(player2).emit('bothReady', player1)
    console.log("a 'bothReady' event has been emitted to both players")
  }
})