import BatteryAnomalyModel from '../models/batteryAnomalyModel';
import { DEFAULT_PROJECTION } from '../utils/constants';

const findBatteryAnomalies = async (filters = {}) => {
	return BatteryAnomalyModel.find(filters, DEFAULT_PROJECTION);
};

const saveBatteryAnomaly = async batteryAnomalyData => {
	return new BatteryAnomalyModel(batteryAnomalyData).save();
};

export { findBatteryAnomalies, saveBatteryAnomaly };