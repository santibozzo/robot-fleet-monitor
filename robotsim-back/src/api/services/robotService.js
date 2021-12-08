import RobotModel from '../models/robotModel';
import { saveBatteryAnomaly } from './batteryAnomalyService';
import { deleteCloseCall, saveOrUpdateCloseCall } from './closeCallService';
import { BATTERY_ERROR, BATTERY_ABRUPT_CHANGE, DEFAULT_PROJECTION } from '../utils/constants';
import settings from '../../settings';

const findRobots = async (filters = {}) => {
	return RobotModel.find({...filters}, DEFAULT_PROJECTION);
};

const saveRobot = async robotData => {
	return new RobotModel(robotData).save();
};

const saveOrUpdateRobot = async robotData => {
	const result = await RobotModel.updateOne({id: robotData.id}, robotData);
	if(result.n === 0) {
		await saveRobot(robotData);
	}
};

const updateRobotState = async robotState => {
	const results = await findRobots({id: robotState.id});
	if(results.length > 0 && (
		!robotState.battery
		|| (!results[0].battery && robotState.battery >= 30)
		|| results[0].battery - robotState.battery >= 50
		|| robotState.battery - results[0].battery >= 30
	)) {
		await saveBatteryAnomaly({
			robotId: robotState.id,
			location: robotState.location,
			oldBatteryCharge: results[0].battery ? results[0].battery : -1,
			newBatteryCharge: robotState.battery ? robotState.battery : -1,
			errorMessage: !robotState.battery ? BATTERY_ERROR : BATTERY_ABRUPT_CHANGE,
			time: new Date().toISOString()
		});
	}
	return saveOrUpdateRobot(robotState);
};

const updateRobotPosition = async robotPosition => {
	const closeRobots = await findRobots({
		location: robotPosition.location,
		x: {$gt: robotPosition.x - 2, $lt: robotPosition.x + 2},
		y: {$gt: robotPosition.y - 2, $lt: robotPosition.y + 2},
		id: {$ne: robotPosition.id}
	});
	if(closeRobots.length > 0) {
		await saveOrUpdateCloseCall({
			robotId: robotPosition.id,
			x: robotPosition.x,
			y: robotPosition.y,
			location: robotPosition.location,
			closeRobots: closeRobots.map(r => r.id)
		});
	}else {
		if(settings.realTimeCloseCalls) {
			await deleteCloseCall(robotPosition.id);
		}
	}
	return saveOrUpdateRobot(robotPosition);
};

export { findRobots, saveOrUpdateRobot, saveRobot, updateRobotState, updateRobotPosition };