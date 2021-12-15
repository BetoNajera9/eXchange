import 'dotenv/config'

// API ENV variables
export const api = {
	name: process.env.APP_NAME || '',
	server: process.env.SERVER_URL || '',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || '3000',
	cors: process.env.CORS || '',
}

// Sentry ENV variables
export const sentry = {
	dsn: process.env.SENTRY_DSN || '',
	id: process.env.SENTRY_ID || '',
}
