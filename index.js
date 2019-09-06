const express = require('express')
const server = express()
const port = process.env.PORT || 6969

server.listen(port, () => {
	console.log(`\n***_Server Reporting For Duty on port: ${port}_***\n`)
})
