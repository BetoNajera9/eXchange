import puppeteer from 'puppeteer'

export default class Scripting {
	constructor() {
		this.baseUrl = 'https://www.bcrp.gob.pe'
		this.sunatUrl = 'https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias'
		this.puppeteerArgs = {
			args: ['--no-sandbox'],
			headless: true,
		}
	}

	async news() {
		this.browser = await puppeteer.launch(this.puppeteerArgs)
		const page = await this.browser.newPage()
		await page.goto(`${this.baseUrl}/operaciones-monetarias-y-cambiarias.html`)
		if (
			page.url !== `${this.baseUrl}/operaciones-monetarias-y-cambiarias.html`
		) {
			console.log('Recaptcha')
		}
		const news = await page.evaluate(() => {
			const list = document.querySelectorAll('div.newslist')
			return list

			// const news = []

			// for (const i of list) {
			// 	news.push(i)
			// }

			// return news
		})

		console.log(news)

		await page.screenshot({ path: 'l.png' })
		await page.close()
	}

	async exchange() {
		this.browser = await puppeteer.launch(this.puppeteerArgs)
		const page = await this.browser.newPage()
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
		)
		await page.goto(this.sunatUrl)
		await page.waitForSelector('.calendar-table')

		await page.screenshot({ path: 'l.png' })

		const elements = await page.evaluate(() => {
			const today = new Date()

			const rows = Array.from(
				document.querySelectorAll('#holder-calendar > table > tbody')[0].rows
			)

			let exchange = []

			rows.forEach((cell) => {
				Array.from(cell.querySelectorAll('td')).forEach((data) => {
					const date = new Date(data.attributes.getNamedItem('data-date').value)

					if (date.getMonth() === today.getMonth()) {
						if (date.getDate() >= today.getDate()) {
							const day = Array.from(data.querySelectorAll('div')).map((i) => {
								return i.textContent
							})
							if (day.length > 1) {
								exchange = day
							}
						}
					}
				})
			})

			return exchange
		})
		await this.browser.close()

		console.log(elements)

		const exchange = {}

		elements.forEach((data) => {
			if (data.includes('Compra')) {
				const buy = 'compra'
				exchange[buy] = +data.replace('Compra', '').replace(' ', '')
			}
			if (data.includes('Venta')) {
				const sell = 'venta'
				exchange[sell] = +data.replace('Venta', '').replace(' ', '')
			}
		})

		exchange.actualizado = new Date()

		return exchange
	}
}
