// Dependencies
import express from 'express'

// Other dependencies
import { api } from '../config/envServer.js'

const router = new express.Router()

// Home endpoint
router.get('/', async (req, res, next) => {
	res.send({
		ProjectName: api.name,
		Server: api.server,
		Repository: 'https://github.com/betonajera9/exchange',
		Author: 'Beto Najera',
	})
})

export default router
