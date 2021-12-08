import axios from 'axios';

const back = axios.create({
	baseURL: 'http://localhost:8080'
});

const getLocations = async () => {
	const result = await back.get('/locations');
	return result.data;
};

const getRobots = async (locationId) => {
	const result = await back.get(`/robots?locationId=${locationId}`);
	return result.data;
};

const getRobot = async (robotId) => {
	const result = await back.get(`/robots/${robotId}`);
	return result.data;
};

const getBatteryAnomalies = async (locationId) => {
	const result = await back.get(`/battery-anomalies?locationId=${locationId}`);
	return result.data;
};

const getCloseCalls = async (locationId) => {
	const result = await back.get(`/close-calls?locationId=${locationId}`);
	return result.data;
};

export {getLocations, getBatteryAnomalies, getCloseCalls, getRobots, getRobot};