const express = require('express')
const router = express.Router()
const db_projects = require('../../data/helpers/projectModel')

//middlewarez
const { checkID, checkFields } = require('./middleware')

//Create
router.post('/', checkFields, async (req, res) => {
	try {
		const { name, description } = req.body
		//check for completed field, default to falsey
		const completed =
			req.body.completed === undefined ? false : req.body.completed
		await db_projects.insert({ name, description, completed })
		const projects = []
		for (let i = 1; i < 51; i++) {
			const project = await db_projects.get(i)
			if (project) projects.push(project)
		}
		projects.length > 0
			? res.status(201).json(projects)
			: res.status(400).json({ message: `I refuse to add that project.` })
	} catch (err) {
		res.status(500).json(err)
	}
})
//Read
router.get('/', async (req, res) => {
	try {
		//Silly rabbit for loops are for kids
		const projects = []
		for (let i = 1; i < 51; i++) {
			const project = await db_projects.get(i)
			if (project) projects.push(project)
		}
		// const projects = await db_projects.get()
		projects.length > 0
			? res.status(200).json(projects)
			: res.status(404).json({ message: `Haha you messed up.` })
	} catch (err) {
		res.status(500).json(err)
	}
})
router.get('/:id', checkID, async (req, res) => {
	try {
		const project = await db_projects.get(req.params.id)
		project
			? res.status(200).json(project)
			: res
					.status(404)
					.json({ message: `Project ${req.params.id} gone like the wind.` })
	} catch (err) {
		res.status(500).json(err)
	}
})
router.get('/:id/actions', checkID, async (req, res) => {
	try {
		const actions = await db_projects.getProjectActions(req.params.id)
		actions.length > 0
			? res.status(200).json(actions)
			: res
					.status(404)
					.json({
						message: `Rutt roh Raggy there are no projects. ${req.params.id}.`
					})
	} catch (err) {
		res.status(500).json(err)
	}
})
//Update
router.put('/:id', checkID, checkFields, async (req, res) => {
	try {
		;(await db_projects.update(req.params.id, req.body))
			? res.status(200).json({ id: req.params.id, ...req.body })
			: res
					.status(404)
					.json({ message: `Project ${req.params.id} missing in action.` })
	} catch (err) {
		res.status(500).json(err)
	}
})
//Delete
router.delete('/:id', checkID, async (req, res) => {
	try {
		;(await db_projects.remove(req.params.id))
			? res
					.status(200)
					.json({ message: `Project ${req.params.id} has been decimated.` })
			: res
					.status(404)
					.json({
						message: `Project ${req.params
							.id} has disapeared like a fart in the wind.`
					})
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
