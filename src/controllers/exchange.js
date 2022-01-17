// Other dependencies
import ExchangeService from '../services/exchange'
import response from '../utils/network/response'

const exchangeService = new ExchangeService()

// Get all exchange Houses
const getAllExchange = async (req, res, next) => {
	try {
		const data = await exchangeService.getExchange()

		response.success(res, 'Exchange Houses find', data)
	} catch (err) {
		next(err)
	}
}

// Get a exchange house
const getExchange = async (req, res, next) => {
	try {
		const data = await exchangeService.getByExchangeId(req.auth.exchange_id)
		response.success(res, 'Exchange House find', data)
	} catch (err) {
		next(err)
	}
}

// Create exchange house
const createExchange = async (req, res, next) => {
	try {
		const data = req.body

		await exchangeService.setExchange(data, req.auth._id)

		response.success(res, 'Exchange house was created', data, 201)
	} catch (err) {
		next(err)
	}
}

// Update exchange house
const updateExchange = async (req, res, next) => {
	try {
		const data = await exchangeService.updateExchange(
			req.body,
			req.auth.exchange_id
		)

		response.success(res, `Exchange house was updated`, data)
	} catch (err) {
		next(err)
	}
}

export default { getAllExchange, getExchange, createExchange, updateExchange }
