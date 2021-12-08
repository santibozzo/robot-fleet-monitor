import { findBatteryAnomalies } from '../services/batteryAnomalyService';

const getBatteryAnomalies = (req, res) => {
	const locationId = req.query.locationId;
	const filters = locationId ? {location: locationId} : {};
	findBatteryAnomalies(filters)
		.then(result => res.status(200).send(result))
		.catch(err => res.status(500).send(err.message));
};

export { getBatteryAnomalies };