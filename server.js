const express = require('express')
// const projectRouter = require('./projects')
const server = express()

server.use(express.json())
// server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
	res.send('<h1>Welcome to the Jungle</h1>')
})

module.exports = server
