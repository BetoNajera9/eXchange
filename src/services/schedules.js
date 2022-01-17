// Other dependencies
import Authentication from './auth'
import Exchange from './exchange'
import Scraping from './scraping'

const authentication = new Authentication()
const exchange = new Exchange()
const scraping = new Scraping()

// Obtain data from SUNAT
const sunat = async () => {
	console.log('SUNAT updated!!!')
	const data = await scraping.exchange()
	data.banco = []
	data.actualizado = new Date()

	const auth = await authentication.getByName('SUNAT')

	await exchange.updateExchange(data, auth.exchange_id)
}

export default { sunat }
