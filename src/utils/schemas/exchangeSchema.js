import joi from 'joi'

export const exchangeSchema = joi.object({
	compra: joi.number().required(),
	venta: joi.number().required(),
	banco: joi
		.array()
		.items(joi.number())
		.required()
		.unique((a, b) => a === b),
})
