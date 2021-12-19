// Other dependenies
import MongoLib from '../lib/mongo.js'
import History from './history.js'
import Bank from './bank'

export default class Exchange {
	constructor() {
		this.collection = 'exchangeHouse'
		this.storage = new MongoLib()
		this.history = new History()
		this.bank = new Bank()
	}

	async getExchange(query) {
		const exchangeHouses = await this.storage.join(
			'authentication',
			{
				name: 'exchangeHouse',
				id: 'exchange_id',
				foreignId: '_id',
			},
			'details'
		)

		await Promise.all(
			exchangeHouses.map(async (i) => {
				delete i.email
				delete i.passwword

				i.details[0].banco = await this.bank.getBanks(i.details[0].banco)
				return i
			})
		)

		return exchangeHouses
	}

	async getByExchangeId(id) {
		const exchange = await this.storage.getById(this.collection, id)
		return exchange
	}

	async setExchange(exchange) {
		const exchangeId = await this.storage.create(this.collection, exchange)

		return exchangeId
	}

	async updateExchange(exchange, exchangeId) {
		const now = new Date()
		exchange.actualizado = now

		const oldExchange = await this.getByExchangeId(exchangeId)
		await this.history.updateHistory(oldExchange)

		const updatedExchangeId = await this.storage.update(
			this.collection,
			exchange,
			exchangeId
		)
		return updatedExchangeId
	}
}
