const express = require('express')
const router = express.Router()
const db_actions = require('../../data/helpers/actionModel')

//middlez
const { checkID, checkFields } = require('./middleware')

//Create
router.post('/', checkFields, async (req, res) => {
	try {
		const { project_id, description, notes } = req.body
		//Checks for completed fields, defaults to false.
		const completed =
			req.body.completed === undefined ? false : req.body.completed
		const action = await db_actions.insert({
			project_id,
			description,
			notes,
			completed
		})
		action
			? res.status(201).json(action)
			: res
					.status(400)
					.json({ message: `Danger Will Robinson..Couldn't add action.` })
	} catch (err) {
		res.status(500).json(err)
	}
})

//Read
router.get('/:id', checkID, async (req, res) => {
	try {
		//Checks to see if there are actions with an id
		const action = await db_actions.get(req.params.id)
		action
			? res.status(200).json(action)
			: res.status(404).json({ message: `Action ${req.params.id} not found.` })
	} catch (err) {
		res.status(500).json(err)
	}
})

//Update
router.put('/:id', checkID, checkFields, async (req, res) => {
	try {
		//Updates the actions no id is found. Thank you middlez!
		;(await db_actions.update(req.params.id, req.body))
			? res.status(200).json({ id: req.params.id, ...req.body })
			: res.status(404).json({ message: `Action ${req.params.id} not found.` })
	} catch (err) {
		res.status(500).json(err)
	}
})

//Delete actions
router.delete('/:id', checkID, async (req, res) => {
	try {
		//Removes the action unless no id is found
		;(await db_actions.remove(req.params.id))
			? res
					.status(200)
					.json({ message: `Action ${req.params.id} has been eliminated!` })
			: res
					.status(404)
					.json({ message: `Action ${req.params.id} Jackson not found.` })
	} catch (err) {
		res.status(500).json(err)
	}
})

//Exports so the server can use it.
module.exports = router
