// Other dependencies
import Auth from '../services/auth'
import response from '../utils/network/response'

const auth = new Auth()

const signIn = async (req, res, next) => {
	try {
		const token = await auth.signIn(req.body.email, req.body.password)

		response.success(res, 'Token was created successfully', token)
	} catch (err) {
		next(err)
	}
}

const signUp = async (req, res, next) => {
	try {
		const token = await auth.signUp(req.body)

		response.success(res, 'Token was created successfully', token)
	} catch (err) {
		next(err)
	}
}

export default { signIn, signUp }
