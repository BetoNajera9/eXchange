// Dependencies
import jwt from 'jsonwebtoken'

// Other dependencies
import { jsonWT } from '../../config/envServer'
import ServerError from '../network/error'

const sign = (data) => {
	return jwt.sign(data, jsonWT.key, {
		expiresIn: jsonWT.expiration,
	})
}

const verify = (token) => {
	return jwt.verify(token, jsonWT.key)
}

const getToken = (auth) => {
	if (!auth)
		throw new ServerError(
			'Dont have token',
			401,
			'Dont have token',
			'Dont have token'
		)

	if (auth.indexOf('Bearer') === -1)
		throw new ServerError(
			'Invalid format',
			400,
			'Invalid format',
			'Invalid format'
		)

	const token = auth.replace('Bearer ', '')

	return token
}

const decodeHeader = (req) => {
	const auth = req.headers.authorization ?? ''
	const token = getToken(auth)
	const decoded = verify(token)

	req.user = decoded

	return decoded
}

const check = {
	own: (req, owner) => {
		const decoded = decodeHeader(req)
		if (decoded.id !== owner) {
			throw new ServerError(
				'You cant do this',
				401,
				'You cant do this',
				'You cant do this'
			)
		}
	},
	logged: (req) => {
		const decoded = decodeHeader(req)
		return decoded
	},
}

export default { sign, check }
