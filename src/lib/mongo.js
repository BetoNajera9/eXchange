import { MongoClient, ObjectId } from 'mongodb'

import { mongo } from '../config/envServer.js'
import ServerError from '../utils/network/error.js'

const USER = encodeURIComponent(mongo.user)
const PASSWORD = encodeURIComponent(mongo.password)
const HOST = mongo.host
const DB = mongo.db
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB}?retryWrites=true&w=majority`

export default class MongoLib {
	constructor() {
		this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true })
		this.dbName = DB
	}

	async connect() {
		try {
			if (!MongoLib.connection) {
				await this.client.connect()
				MongoLib.connection = this.client.db(this.dbName)
			}
			return MongoLib.connection
		} catch ({ message }) {
			throw new ServerError(message, 500)
		}
	}

	async getById(collection, id, projection = {}) {
		const db = await this.connect()
		return await db
			.collection(collection)
			.findOne({ _id: ObjectId(id) }, { projection })
	}

	async get(collection, query = {}, projection = {}) {
		const db = await this.connect()
		return await db.collection(collection).find(query, { projection }).toArray()
	}

	async join(collection, foreignCollection, nameField) {
		const db = await this.connect()
		return await db
			.collection(collection)
			.aggregate([
				{
					$lookup: {
						from: foreignCollection.name,
						localField: foreignCollection.id,
						foreignField: foreignCollection.foreignId,
						as: nameField,
					},
				},
			])
			.toArray()
	}

	async create(collection, data) {
		const db = await this.connect()
		return await db.collection(collection).insertOne(data)
	}

	async update(collection, data, id) {
		const db = await this.connect()
		return await db
			.collection(collection)
			.updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
	}

	async delete(collection, id) {
		const db = await this.connect()
		return await db.collection(collection).deleteOne({ _id: id })
	}
}
