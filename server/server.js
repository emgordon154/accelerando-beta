const express = require('express')
const app = express()

const path = require('path')

const port = process.env.PORT || 8080

const server = app.listen(port, () => {
  console.log(`Server is serving through port ${port}`)
})

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

module.exports = server