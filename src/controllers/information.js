// Other dependencies
import News from '../services/news'
import ExchangeRate from '../services/exchangeRate'
import response from '../utils/network/response'

const exchangeRate = new ExchangeRate()
const news = new News()

const getNews = async (req, res, next) => {
	try {
		const data = await news.getNews(req.params.id)

		response.success(res, `News find`, data, 200)
	} catch (err) {
		next(err)
	}
}

const getExchangeRate = async (req, res, next) => {
	try {
		const data = await exchangeRate.getExchangeRate(req.params.id)

		response.success(res, `News find`, data, 200)
	} catch (err) {
		next(err)
	}
}

const updateNews = async (req, res, next) => {
	try {
		const data = await news.updateNews(req.body)

		response.success(res, `News was update`, data, 201)
	} catch (err) {
		next(err)
	}
}

const setExchangeRate = async (req, res, next) => {
	try {
		const data = await exchangeRate.setExchangeRate(req.body)
		response.success(res, `Exhcnage Rate was update`, data, 201)
	} catch (err) {
		next(err)
	}
}

export default { getNews, getExchangeRate, updateNews, setExchangeRate }
