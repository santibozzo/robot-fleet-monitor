import mongoose from 'mongoose';

const robotSchema = new mongoose.Schema({
	id: {type: String, unique: true, required: true},
	x: {type: Number},
	y: {type: Number},
	location: {type: String, index: true},
	battery: {type: Number},
	mode: {type: String},
	status: {type: String}
});

export default mongoose.model('Robot', robotSchema);