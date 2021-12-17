// Other dependencies
import log from '../network/log'
import ServerError from '../network/error'

// Validation schema on scope
const validate = (data, schema) => {
	try {
		const val = schema.validate(data)
		return val.error
	} catch ({ message }) {
		log.error(message)
	}
}

// Validation error, if it differs of validation schema
const validationHandler = (schema, check = 'body') => {
	return (req, res, next) => {
		const error = validate(req[check], schema)
		error
			? next(new ServerError(error.message, 400, 'invalidJSON', 'invalidJSON'))
			: next()
	}
}

export default validationHandler
