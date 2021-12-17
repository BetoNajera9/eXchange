const responseSucces = (res, message, data, status = 200) => {
	res.status(status).send({
		success: true,
		status,
		message,
		data,
	})
}

const responseError = (res, message = 'Server Error', status = 500) => {
	res.status(status).send({
		success: false,
		status,
		message,
		data: null,
	})
}

export default {
	success: responseSucces,
	error: responseError,
}
