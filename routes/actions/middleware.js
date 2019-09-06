const db_actions = require('../../data/helpers/actionModel')
const db_projects = require('../../data/helpers/projectModel')

//Middleware to check the ID of an existing project
checkID = async (req, res, next) => {
	try {
		const action = await db_actions.get(req.params.id)
		action
			? next()
			: res.status(404).json({ message: `Action ${req.params.id} not found.` })
	} catch (err) {
		res.status(500).json(err)
	}
}

checkFields = async (req, res, next) => {
	console.log(req.body)
	req.body && Object.keys(req.body).length > 2 //check if there are fields present
		? req.body.project_id && req.body.description && req.body.notes //check if required fields are present
			? req.body.description.length < 129 //check if description isn't too long
				? db_projects.get(req.body.project_id) //check if project with specified id exists
					? next()
					: res
							.status(404)
							.json({
								message: `Project ${req.body.project_id} was not found.`
							})
				: res
						.status(400)
						.json({ message: `Description must be 128 characters or less.` })
			: res
					.status(400)
					.json({ message: `Missing required fields, or fields are empty.` })
		: res.status(400).json({ message: `Action data not received.` })
}

module.exports = { checkID, checkFields }
