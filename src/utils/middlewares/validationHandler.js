// Other dependencies
import ServerError from '../network/error'
import jwt from '../auth/jwt'

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
			? next(new ServerError(error.message, 400, 'invalidJSON', 'invalidJSON'))
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
			next(new ServerError(error.message, 400, 'InvalidToken', 'InvalidToken'))
		}

		const decodedToken = jwt.decodeHeader(token)

		if (!decodedToken) {
			next(
				new ServerError('Invalid Token', 401, 'InvalidToken', 'InvalidToken')
			)
		}

		delete decodedToken.password
		delete decodedToken.email

		req.auth = decodedToken
		next()
	}
}
