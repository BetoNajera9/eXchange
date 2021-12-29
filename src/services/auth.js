// Dependencies
import bcrypt from 'bcrypt'

// Other dependencies
import MongoLib from '../lib/mongo'
import jwt from '../utils/auth/jwt'
import Exchange from './exchange'
import ServerError from '../utils/network/error'

export default class Auth {
	constructor() {
		this.collection = 'authentication'
		this.storage = new MongoLib()
		this.exchange = new Exchange()
	}

	async signIn(email, password) {
		const err = (data) => {
			if (!data || data === false) {
				throw new ServerError(
					'Invalid Information',
					400,
					'InvalidInfo',
					'InvalidInfo'
				)
			}
		}

		const data = await this.getByEmail(email)
		err(data)

		const equals = await bcrypt.compare(password, data.password)
		err(equals)

		delete data.password
		delete data.email

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

		const now = new Date()
		const exchange = await this.exchange.setExchange({
			compra: 0,
			venta: 0,
			banco: [],
			actualizado: now,
		})

		data.exchange_id = exchange.insertedId

		await this.storage.create(this.collection, data)

		delete data.password
		delete data.email

		const token = jwt.sign(data)

		return token
	}

	async getByName(name) {
		const data = await this.storage.get(this.collection, {
			name,
		})

		if (!data.length) return undefined
		return data[0]
	}
}
