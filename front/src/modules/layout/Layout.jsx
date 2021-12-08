import {Route, Routes} from 'react-router';
import Locations from "../locations/Locations";
import Location from "../location/Location";
import Robots from "../robots/Robots";
import BatteryAnomalies from "../battery-anomalies/BatteryAnomalies";
import CloseCalls from "../close-calls/CloseCalls";

const Layout = () => {

	return (
		<Routes>
			<Route path='/' element={<Locations />} />
			<Route path='/locations/:locationId' element={<Location/>} />
			<Route path='/locations/:locationId/robots' element={<Robots/>} />
			<Route path='/locations/:locationId/battery-anomalies' element={<BatteryAnomalies/>} />
			<Route path='/locations/:locationId/close-calls' element={<CloseCalls/>} />
		</Routes>
	);
};

export default Layout;