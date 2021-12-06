
const saveErrorHandler = (error, res) => {
	if(error.name === 'ValidationError') {
		res.status(400).send(error.message);
	}else {
		res.status(500).send(error.message);
	}
};

export { saveErrorHandler };