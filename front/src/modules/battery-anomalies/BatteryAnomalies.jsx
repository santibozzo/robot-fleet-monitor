import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {getBatteryAnomalies} from "../../api/backApi";
import Table from "../../components/Table";
import './BatteryAnomalies.css';

const INTERVAL_TIME = 5000;
const COLUMNS = [
	'Robot ID',
	'Carga anterior',
	'Carga posterior',
	'Mensaje',
	'Fecha y hora'
];

const BatteryAnomalies = props => {
	const {locationId} = useParams();
	const [batteryAnomalies, setBatteryAnomalies] = useState([]);
	const [rows, setRows] = useState([]);
	const [intervalId, setIntervalId] = useState(null);

	const startInterval = () => {
		intervalId && clearInterval(intervalId);
		const newIntervalId = setInterval(async () => {
			const newBatteryAnomalies = await getBatteryAnomalies(locationId);
			setBatteryAnomalies(newBatteryAnomalies);
		}, INTERVAL_TIME);
		setIntervalId(newIntervalId);
	};

	const init = async () => {
		const newBatteryAnomalies = await getBatteryAnomalies(locationId);
		setBatteryAnomalies(newBatteryAnomalies);
		startInterval();
	};

	useEffect(init, []);

	const processRows = () => {
		const newRows = batteryAnomalies.map(anomaly => ({
			cells: [
				anomaly.robotId,
				anomaly.oldBatteryCharge.toFixed(2),
				anomaly.newBatteryCharge.toFixed(2),
				anomaly.errorMessage,
				anomaly.time
			]
		}));
		setRows(newRows);
	};

	useEffect(processRows, [batteryAnomalies]);

	return (
		<div className={'battery-anomalies-div'}>
			<h1>{`Alertas de baterías - Depósito ${locationId}`}</h1>
			<Table
				className={'battery-anomalies-table'}
				columns={COLUMNS}
				rows={rows}
			/>
		</div>
	);
};

export default BatteryAnomalies;