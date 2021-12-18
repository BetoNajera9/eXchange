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
	try {
		return jwt.verify(token, jsonWT.key)
	} catch (err) {
		throw new ServerError(err.message, 402, err.name, err.name)
	}
}

const decodeHeader = (token) => {
	const auth = token
	const tokenDecoded = auth.replace('Bearer ', '')
	const decoded = verify(tokenDecoded)

	return decoded
}

export default { sign, decodeHeader }
