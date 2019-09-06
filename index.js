const server = require('./server.js')

//Start server listening
const port = process.env.PORT || 6969
server.listen(port, () => {
	console.log(`\n***_Server Reporting For Duty on port: ${port}_***\n`)
})
