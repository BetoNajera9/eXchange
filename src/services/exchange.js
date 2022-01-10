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

	async getExchange(query, variables = {}) {
		const dataQuery = () => {
			if (query) {
				return {
					from: 'exchangeHouse',
					let: { authentication_exchange_id: '$exchange_id', ...variables },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [
										{ $eq: ['$$authentication_exchange_id', '$_id'] },
										query,
									],
								},
							},
						},
					],
					as: 'details',
				}
			}
			return {
				from: 'exchangeHouse',
				localField: 'exchange_id',
				foreignField: '_id',
				as: 'details',
			}
		}

		const exchangeHouses = await this.storage.join(
			'authentication',
			dataQuery()
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
		exchange.compra = +exchange.compra
		exchange.venta = +exchange.venta

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
