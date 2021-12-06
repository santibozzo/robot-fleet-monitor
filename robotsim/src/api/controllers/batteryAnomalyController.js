import { findBatteryAnomalies } from '../services/batteryAnomalyService';

const getBatteryAnomalies = (req, res) => {
	findBatteryAnomalies()
		.then(result => res.status(200).send(result))
		.catch(err => res.status(500).send(err.message));
};

export { getBatteryAnomalies };