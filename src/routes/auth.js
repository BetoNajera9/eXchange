// Dependencies
import express from 'express'

// Other dependencies
import auth from '../controllers/auth'
import * as authSchema from '../utils/schemas/authSchema'
import { bodyValidationHandler } from '../utils/middlewares/validationHandler'

const router = new express.Router()

router.post(
	'/signIn',
	bodyValidationHandler(authSchema.signInSchema),
	auth.signIn
)
router.post(
	'/signUp',
	bodyValidationHandler(authSchema.signUpSchema),
	auth.signUp
)

export default router
