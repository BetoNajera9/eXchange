// Dependencies
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

// Other dependencies
import MongoLib from '../lib/mongo'
import jwt from '../utils/auth/jwt'
import ServerError from '../utils/network/error'

export default class Auth {
	constructor() {
		this.collection = 'authentication'
		this.storage = new MongoLib()
	}

	async signIn(email, password) {
		const data = await this.getByEmail(email)

		const equals = await bcrypt.compare(password, data.password)

		if (!data || equals !== true) {
			throw new ServerError(
				'Invalid Information',
				401,
				'InvalidInfo',
				'InvalidInfo'
			)
		}

		return jwt.sign(data)
	}

	async signUp(data) {
		if (await this.getByEmail(data.email)) {
			throw new ServerError(
				'This email is already registered',
				409,
				'EmailUsed',
				'EmailUsed'
			)
		}

		data.password = await bcrypt.hash(data.password, 5)

		await this.storage.create(this.collection, data)

		const token = jwt.sign(data)

		return token
	}

	async getByEmail(email) {
		const data = await this.storage.get(this.collection, {
			email,
		})

		if (!data.length) return undefined
		return data[0]
	}

	async addExchange(authId, exchangeId) {
		return await this.storage.update(
			this.collection,
			{ exchange_id: ObjectId(exchangeId) },
			authId
		)
	}
}
