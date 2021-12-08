import CloseCallModel from '../models/closeCallModel';
import { DEFAULT_PROJECTION } from '../utils/constants';

const findCloseCalls = async (filters = {}) => {
	return CloseCallModel.find(filters, DEFAULT_PROJECTION);
};

const saveCloseCall = async closeCallData => {
	return new CloseCallModel(closeCallData).save();
};

const saveOrUpdateCloseCall = async closeCallData => {
	const result = await CloseCallModel.updateOne({robotId: closeCallData.robotId}, closeCallData);
	if(result.n === 0) {
		await saveCloseCall(closeCallData);
	}
};

const deleteCloseCall = async robotId => {
	return CloseCallModel.deleteOne({robotId});
};

export { findCloseCalls, saveCloseCall, saveOrUpdateCloseCall, deleteCloseCall };