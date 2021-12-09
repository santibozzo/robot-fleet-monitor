import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {getCloseCalls} from "../../api/backApi";
import Table from "../../components/Table";
import './CloseCalls.css';

const INTERVAL_TIME = 5000;
const COLUMNS = [
	'Robot ID',
	'X',
	'Y',
	'Robots en cercanía'
];

const CloseCalls = props => {
	const {locationId} = useParams();
	const [closeCalls, setCloseCalls] = useState([]);
	const [rows, setRows] = useState([]);
	const [intervalId, setIntervalId] = useState(null);

	const startInterval = () => {
		intervalId && clearInterval(intervalId);
		const newIntervalId = setInterval(async () => {
			const newCloseCalls = await getCloseCalls(locationId);
			setCloseCalls(newCloseCalls);
		}, INTERVAL_TIME);
		setIntervalId(newIntervalId);
	};

	const init = async () => {
		const newCloseCalls = await getCloseCalls(locationId);
		setCloseCalls(newCloseCalls);
		startInterval();
	};

	useEffect(init, []);

	const processRows = () => {
		const newRows = closeCalls.map(anomaly => ({
			cells: [
				anomaly.robotId,
				anomaly.x,
				anomaly.y,
				anomaly.closeRobots.join(', ')
			]
		}));
		setRows(newRows);
	};

	useEffect(processRows, [closeCalls]);

	return (
		<div className={'close-calls-div'}>
			<h1>{`Alertas de colisiones - Depósito ${locationId}`}</h1>
			<Table
				className={'close-calls-table'}
				columns={COLUMNS}
				rows={rows}
			/>
		</div>
	);
};

export default CloseCalls;