// Dependencies
import express from 'express'

// Other dependencies
import response from '../utils/network/response'
import * as authSchema from '../utils/schemas/authSchema'
import { bodyValidationHandler } from '../utils/middlewares/validationHandler'
import Auth from '../services/auth'

const router = new express.Router()
const auth = new Auth()

router.post(
	'/signIn',
	bodyValidationHandler(authSchema.signInSchema),
	async (req, res, next) => {
		try {
			const token = await auth.signIn(req.body.email, req.body.password)

			response.success(res, 'Token was created succesfully', token)
		} catch (err) {
			next(err)
		}
	}
)

router.post(
	'/signUp',
	bodyValidationHandler(authSchema.signUpSchema),
	async (req, res, next) => {
		try {
			const token = await auth.signUp(req.body)

			response.success(res, 'Token was created succesfully', token)
		} catch (err) {
			next(err)
		}
	}
)

export default router
