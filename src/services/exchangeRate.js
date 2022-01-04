// Other dependencies
import MongoLib from '../lib/mongo'

export default class exchangeRate {
	constructor() {
		this.storage = new MongoLib()
		this.collection = 'exchangeRate'
	}

	async getExchangeRate(id) {
		const news = await this.storage.getBySimpleId(this.collection, id)

		return news
	}

	async setExchangeRate(data) {
		const now = new Date()
		const id = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`

		const exchangeRate = await this.storage.create(this.collection, {
			_id: id,
			...data,
		})

		return exchangeRate
	}
}
