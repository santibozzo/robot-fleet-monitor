import { findCloseCalls } from '../services/closeCallService';

const getCloseCalls = (req, res) => {
	const locationId = req.query.locationId;
	const filters = locationId ? {location: locationId} : {};
	findCloseCalls(filters)
		.then(result => res.status(200).send(result))
		.catch(err => res.status(500).send(err.message));
};

export { getCloseCalls };