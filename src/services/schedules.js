// Dependencies
import axios from 'axios'

// Other dependencies
import Authentication from './auth'
import Exchange from './exchange'
import Scraping from './scraping'

const authentication = new Authentication()
const exchange = new Exchange()
const scraping = new Scraping()

// Obtain data from SUNAT
const sunat = async () => {
	console.log('Updating...')
	const data = await scraping.exchange()
	if (!data.compra || !data.venta) {
		const config = {
			method: 'get',
			url: 'https://www.deperu.com/api/rest/cotizaciondolar.json',
		}

		const api = await axios(config)

		data.compra = api.data.Cotizacion[0].Compra
		data.venta = api.data.Cotizacion[0].Venta
		console.log(data)
	}
	data.banco = []
	data.actualizado = new Date()

	const auth = await authentication.getByName('SUNAT')

	await exchange.updateExchange(data, auth.exchange_id)
	console.log('Updated!!!')
}

export default { sunat }
