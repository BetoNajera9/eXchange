import joi from 'joi'

export const signInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
})

export const signUpSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
	name: joi.string().required(),
})
