const responseSucces = (res, message, data, status = 200) => {
	res.status(status).send({
		succes: true,
		status,
		message,
		data,
	})
}

const responseError = (res, message = 'Server Error', status = 500) => {
	res.status(status).send({
		succes: false,
		status,
		message,
		data: null,
	})
}

export default {
	succes: responseSucces,
	error: responseError,
}
