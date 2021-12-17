// Dependencies
import express from 'express'

// Other dependencies
import ExchangeService from '../services/exchange'
import response from '../utils/network/response'
import { exchangeSchema } from '../utils/schemas/exchangeSchema'
import validationHadler from '../utils/middlewares/validationHandler'

const router = new express.Router()
const exchangeService = new ExchangeService()

// Get all exchange Houses
router.get('/', async (req, res, next) => {
	try {
		const data = await exchangeService.getExchange()

		response.success(res, 'Exchange Houses find', data)
	} catch (err) {
		next(err)
	}
})

// Get a exchange house
router.get('/:id', async (req, res, next) => {
	try {
		const data = await exchangeService.getByExchangeId(req.params.id)
		response.success(res, 'Exchange House find', data)
	} catch (err) {
		next(err)
	}
})

// Create exchange house
router.post('/', validationHadler(exchangeSchema), async (req, res, next) => {
	try {
		const data = req.body

		await exchangeService.setExchange(data)

		response.success(res, 'Exchange house was created', data, 201)
	} catch (err) {
		next(err)
	}
})

// Update exchange house
router.put('/:id', validationHadler(exchangeSchema), async (req, res, next) => {
	try {
		const data = await exchangeService.updateExchange(req.body, req.params.id)

		response.success(res, `Exchange house was updated`, data)
	} catch (err) {
		next(err)
	}
})

export default router
