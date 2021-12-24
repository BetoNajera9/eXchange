// Other dependencies
import MongoLib from '../lib/mongo'

export default class History {
	constructor() {
		this.collection = 'history'
		this.storage = new MongoLib()
	}

	async updateHistory(exchange) {
		const data = await this.storage.getById(this.collection, exchange._id)

		if (!data) {
			await this.storage.create(this.collection, { _id: exchange._id })
		}

		await this.deleteHistory(data)

		const update = {}
		update[exchange.actualizado] = {
			compra: exchange.compra,
			venta: exchange.venta,
			banco: exchange.banco,
			actualizado: exchange.actualizado,
		}

		await this.storage.update(this.collection, update, exchange._id)
	}

	async deleteHistory(data) {
		if (data !== null) {
			console.log(data)
			const shows = data[Object.keys(data)[1]]

			if (shows) {
				const today = new Date()

				if (today.getUTCDate() > shows.actualizado.getUTCDate()) {
					this.storage.delete(this.collection, data._id)
				}
			}
		}
	}
}
