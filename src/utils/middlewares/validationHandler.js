// Other dependencies
import ServerError from '../network/error'
import jwt from '../auth/jwt'
import Bank from '../../services/bank'

const bank = new Bank()

// Validation schema on scope
const validate = (data, schema) => {
	const val = schema.validate(data)
	return val.error
}

// Validation error, if it differs of validation schema
export const bodyValidationHandler = (schema, check = 'body') => {
	return (req, res, next) => {
		const error = validate(req[check], schema)
		error
			? next(new ServerError(error.message, 400, 'InvalidJSON', 'InvalidJSON'))
			: next()
	}
}

export const tokenValidationHandler = (
	schema,
	check = 'authorization',
	parameter = 'headers'
) => {
	return (req, res, next) => {
		const token = req[parameter][check]
		const error = validate(token, schema)
		if (error) {
			next(new ServerError(error.message, 401, 'InvalidToken', 'InvalidToken'))
		}

		const decodedToken = jwt.decodeHeader(token)

		if (!decodedToken) {
			next(
				new ServerError('Invalid Token', 402, 'InvalidToken', 'InvalidToken')
			)
		}

		req.auth = decodedToken
		next()
	}
}

export const bankValidationHandler = () => {
	return async (req, res, next) => {
		const banks = await bank.getBanks(req.body.banco)

		!banks
			? next(
					new ServerError('Invalid Banks', 400, 'InvalidBanks', 'InvalidBanks')
			  )
			: next()
	}
}
