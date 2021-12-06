import { findCloseCalls } from '../services/closeCallService';

const getCloseCalls = (req, res) => {
	findCloseCalls()
		.then(result => res.status(200).send(result))
		.catch(err => res.status(500).send(err.message));
};

export { getCloseCalls };