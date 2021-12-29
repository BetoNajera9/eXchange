// Dependencies
import express from 'express'

// Other ddependencies
import { tokenValidationHandler } from '../utils/middlewares/validationHandler'
import { token } from '../utils/schemas/authSchema'
import Scraping from '../services/scraping'
import response from '../utils/network/response'

const scraping = new Scraping()
const router = new express.Router()

router.get('/news', tokenValidationHandler(token), async (req, res, next) => {
	try {
		await scraping.news()
		response.success(res, `Si se pudo`, { secces: true }, 201)
	} catch (err) {
		next(err)
	}
})

export default router
