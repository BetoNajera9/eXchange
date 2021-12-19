// Dependencies
import express from 'express'

// Other ddependencies
import Scraping from '../services/scraping'
import response from '../utils/network/response'

const scraping = new Scraping()
const router = new express.Router()

router.get('/news', async (req, res, next) => {
	try {
		await scraping.news()
		response.success(res, `Si se pudo`, { secces: true }, 201)
	} catch (err) {
		next(err)
	}
})

router.get('/exchange', async (req, res, next) => {
	try {
		const data = await scraping.exchange()
		response.success(res, `Si se pudo`, data, 201)
	} catch (err) {
		next(err)
	}
})

export default router
