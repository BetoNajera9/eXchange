// Other dependencies
import MongoLib from '../lib/mongo'

export default class Bank {
	constructor() {
		this.collection = 'bank'
		this.storage = new MongoLib()
	}

	async getBanks(bankIds) {
		const bank = await this.storage.get(this.collection, {
			_id: { $in: bankIds },
		})

		if (!bank.length) return undefined
		return bank
	}
}
