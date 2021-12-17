import MongoLib from '../lib/mongo.js'

export default class Exchange {
	constructor() {
		this.collection = 'exchangeHouse'
		this.storage = new MongoLib()
	}

	async getExchange(query) {
		const exchangeHouses = await this.storage.get(this.collection, query)
		return exchangeHouses
	}

	async getByExchangeId(id) {
		const exchange = await this.storage.getbyId(this.collection, id)
		return exchange
	}

	async setExchange(exchange) {
		const exchangeId = await this.storage.create(this.collection, exchange)
		return exchangeId
	}

	async updateExchange(exchange, exchangeId) {
		const updatedExchangeId = await this.storage.update(
			this.collection,
			exchange,
			exchangeId
		)
		return updatedExchangeId
	}

	async deleteExchange(exchangeId) {
		const deleletedExchangeId = await this.storage.delete(
			this.collection,
			exchangeId
		)
		return deleletedExchangeId
	}
}
