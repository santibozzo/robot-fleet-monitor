import mongoose from 'mongoose';

const closeCallSchema = new mongoose.Schema({
	robotId: {type: String, required: true, unique: true},
	x: {type: Number},
	y: {type: Number},
	location: {type: String},
	closeRobots: {type: [String]}
});

export default mongoose.model('CloseCall', closeCallSchema);