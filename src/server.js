// Dependencies
import express from 'express'
import cors from 'cors'
import cron from 'node-cron'

// Other dependencies
import { logErrors } from './utils/middlewares/errorsHandler'
import { api } from './config/envServer'
import schedules from './services/schedules'
import information from './routes/information'
import exchange from './routes/exchange'
import routes from './routes/index'
import auth from './routes/auth'

const app = express()

// Schedules
cron.schedule('* 0,1,3,6 * * *', schedules.sunat)

// Middlewares
if (api.env !== 'production') {
	app.use(cors('*'))
} else {
	const helmet = require('helmet')

	app.use(cors(api.cors))
	app.use(helmet())
	app.use(helmet.permittedCrossDomainPolicies())
	app.disable('x-powered-by')
}
app.use(express.json())

// Routes
app.get('/', (req, res, next) => {
	res.redirect('/api')
})
app.use('/api', routes)
app.use('/api/auth', auth)
app.use('/api/exchange', exchange)
app.use('/api/information', information)

// Handler Error
app.use(logErrors)

if (api.env !== 'test') {
	app.listen(api.port, (err) => {
		if (err) console.error(err)
		else {
			if (api.server !== '') console.log(`=> Server on ${api.server}`)
			else console.log(`=> Server on http://localhost:${api.port}`)
		}
	})
} else {
	app.listen(api.port)
}

export default app
