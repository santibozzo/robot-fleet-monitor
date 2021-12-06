import mongoose from 'mongoose';

const batterAnomalySchema = new mongoose.Schema({
	robotId: {type: String, required: true},
	oldBatteryCharge: {type: Number},
	newBatteryCharge: {type: Number},
	errorMessage: {type: String},
	time: {type: String}
});

export default mongoose.model('BatteryAnomaly', batterAnomalySchema);