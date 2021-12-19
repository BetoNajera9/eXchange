// Dependencies
import express from 'express'
import axios from 'axios'

// Other ddependencies
import { tokenValidationHandler } from '../utils/middlewares/validationHandler'
import { token } from '../utils/schemas/authSchema'
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

router.get(
	'/exchange',
	tokenValidationHandler(token),
	async (req, res, next) => {
		try {
			const { data } = await axios.get(
				'https://www.deperu.com/api/rest/cotizaciondolar.json'
			)
			data.nombre = 'SUNAT'

			response.success(
				res,
				`Data find`,
				{ ...data.Cotizacion[0], nombre: 'SUNAT', actualizado: new Date() },
				200
			)
		} catch (err) {
			next(err)
		}
	}
)

export default router
