// Other dependencies
import MongoLib from '../lib/mongo'

export default class News {
	constructor() {
		this.storage = new MongoLib()
		this.collection = 'news'
	}

	async getNews(id) {
		const news = await this.storage.getBySimpleId(this.collection, id)

		return news
	}

	async updateNews(data) {
		const now = new Date()
		const id = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`

		const dataNews = await this.getNews(id)
		if (!dataNews) {
			await this.storage.create(this.collection, {
				_id: id,
			})
		}

		const update = {}
		update[now] = {
			...data,
		}

		const news = await this.storage.updateSimpleId(this.collection, update, id)

		return news
	}
}
