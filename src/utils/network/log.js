import chalk from 'chalk'

import { api } from '../../config/envServer'

const render = (header, body) => {
	console.log(header)
	body && console.log(body)
	body && console.log('\n')
}

export default class Response {
	static listen() {
		const header = `${chalk.blue(`[Server of ${api.env}]`)}  ${chalk.cyan(
			`${api.name} on ${api.server}`
		)}`
		render(header)
	}

	static success(message) {
		const header = `${chalk.greenBright('[SERVER]')}  ${chalk.greenBright(
			'Success operation'
		)}`
		render(header, message)
	}

	static error(message) {
		const header = `${chalk.redBright('[SERVER]')}  ${chalk.redBright(
			'Bad operation'
		)}`
		render(header, message)
	}

	static info(message) {
		const header = `${chalk.yellowBright('[server]')}  ${chalk.yellowBright(
			'Info operation'
		)}`
		render(header, message)
	}
}
