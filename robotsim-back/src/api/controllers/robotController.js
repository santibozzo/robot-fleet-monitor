import { saveOrUpdateRobot, findRobots, updateRobotState, updateRobotPosition } from '../services/robotService';
import { saveErrorHandler } from '../utils/errorHandlers';

const getRobots = (req, res) => {
	const locationId = req.query.locationId;
	const filters = locationId ? {location: locationId} : {};
	findRobots(filters)
		.then((results) => res.status(200).send(results))
		.catch(err => res.status(500).send(err.message));
};

const getRobotById = (req, res) => {
	findRobots({id: req.params.id})
		.then((results) => {
			if(results.length === 0) {
				res.sendStatus(404);
			}else {
				res.status(200).send(results[0]);
			}
		})
		.catch(err => res.status(500).send(err.message));
};

const crateOrUpdateRobot = (req, res) => {
	saveOrUpdateRobot(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => saveErrorHandler(err, res));
};

const updateState = (req, res) => {
	updateRobotState(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => saveErrorHandler(err, res));
};

const updatePosition = (req, res) => {
	updateRobotPosition(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => saveErrorHandler(err, res));
};

export { getRobots, crateOrUpdateRobot, updateState, updatePosition, getRobotById };