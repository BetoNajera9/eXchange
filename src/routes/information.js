// Dependencies
import express from 'express'

// Other ddependencies
import { tokenValidationHandler } from '../utils/middlewares/validationHandler'
import { token } from '../utils/schemas/authSchema'
import response from '../utils/network/response'
import ExchangeRate from '../services/exchangeRate'
import News from '../services/news'
// import Scraping from '../services/scraping'

// const scraping = new Scraping()
const router = new express.Router()
const exchangeRate = new ExchangeRate()
const news = new News()

router.get('/news/:id', async (req, res, next) => {
	try {
		const data = await news.getNews(req.params.id)

		response.success(res, `News find`, data, 200)
	} catch (err) {
		next(err)
	}
})

router.get('/exchangeRate/:id', async (req, res, next) => {
	try {
		const data = await exchangeRate.getExchangeRate(req.params.id)

		response.success(res, `News find`, data, 200)
	} catch (err) {
		next(err)
	}
})

router.put('/news', tokenValidationHandler(token), async (req, res, next) => {
	try {
		const data = await news.updateNews(req.body)

		response.success(res, `News was update`, data, 201)
	} catch (err) {
		next(err)
	}
})

router.post(
	'/exchangeRate',
	tokenValidationHandler(token),
	async (req, res, next) => {
		try {
			const data = await exchangeRate.setExchangeRate(req.body)
			response.success(res, `Exhcnage Rate was update`, data, 201)
		} catch (err) {
			next(err)
		}
	}
)

export default router
