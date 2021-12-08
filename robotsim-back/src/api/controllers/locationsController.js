import settings from '../../settings.json';

const getLocations = (req, res) => {
	const locations = [];
	for(let i = 1; i <= settings.locationsAmount; i++) {
		locations.push(i.toString());
	}
	res.status(200).send(locations);
};

export {getLocations};