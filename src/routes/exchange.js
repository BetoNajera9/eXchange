// Dependencies
import express from 'express'

// Other dependencies
import exchange from '../controllers/exchange'
import { exchangeSchema } from '../utils/schemas/exchangeSchema'
import { token } from '../utils/schemas/authSchema'
import {
	bodyValidationHandler,
	tokenValidationHandler,
	bankValidationHandler,
} from '../utils/middlewares/validationHandler'

const router = new express.Router()

router.get('/', exchange.getAllExchange)
router.get('/get', tokenValidationHandler(token), exchange.getExchange)

router.post(
	'/',
	tokenValidationHandler(token),
	bodyValidationHandler(exchangeSchema),
	bankValidationHandler(),
	exchange.createExchange
)

router.put(
	'/update',
	tokenValidationHandler(token),
	bodyValidationHandler(exchangeSchema),
	exchange.updateExchange
)

export default router
