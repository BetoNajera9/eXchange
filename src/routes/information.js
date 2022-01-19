// Dependencies
import express from 'express'

// Other ddependencies
import { tokenValidationHandler } from '../utils/middlewares/validationHandler'
import information from '../controllers/information'
import { token } from '../utils/schemas/authSchema'

const router = new express.Router()

router.get('/news/:id', information.getNews)
router.get('/exchangeRate/:id', information.getExchangeRate)

router.post(
	'/exchangeRate',
	tokenValidationHandler(token),
	information.setExchangeRate
)

router.put('/news', tokenValidationHandler(token), information.updateNews)

export default router
