import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState, Fragment} from "react";
import {getRobot, getRobots} from "../../api/backApi";
import Button from "../../components/Button";
import './Robots.css';

const INTERVAL_TIME = 2000;

const Robots = props => {
	const {locationId} = useParams();
	const [robots, setRobots] = useState([]);
	const [robotSelected, setRobotSelected] = useState(null);
	const [intervalId, setIntervalId] = useState(null);

	const startInterval = (robotId) => {
		intervalId && clearInterval(intervalId);
		const newIntervalId = setInterval(async () => {
			const robotData = await getRobot(robotId);
			setRobotSelected(robotData);
		}, INTERVAL_TIME);
		setIntervalId(newIntervalId);
	};

	const init = async () => {
		const newRobots = await getRobots(locationId);
		const newRobotSelected = newRobots.length > 0 ? newRobots[0] : null;
		setRobotSelected(newRobotSelected);
		startInterval(newRobotSelected.id);
		setRobots(newRobots);
	};

	useEffect(init, []);

	const onRobotSelected = async (robotId) => {
		const robot = robots.find(r => r.id === robotId);
		setRobotSelected(robot);
		startInterval(robotId);
	};

	return (
		<div className={'robots-div'}>
			<h1>{`Robots - Depósito ${locationId}`}</h1>
			<div className={'robots-div-container'}>
				<div className={'robots-div-left'}>
					{robots.map(r => (
						<Button
							className={'robots-button'}
							style={r.id === robotSelected.id ? 'blue' : 'blue-transparent'}
							text={`Robot ${r.id}`}
							onClick={() => onRobotSelected(r.id)}
						/>
					))}
				</div>
				<div className={'robots-div-right'}>
					{!robotSelected ? null : (
						<Fragment>
							<strong className={'robots-strong'}>ID:</strong>{robotSelected.id}<br/>
							<strong className={'robots-strong'}>Batería:</strong>{robotSelected.battery.toFixed(2)}<br/>
							<strong className={'robots-strong'}>Modo:</strong>{robotSelected.mode}<br/>
							<strong className={'robots-strong'}>Status:</strong>{robotSelected.status}<br/>
							<strong className={'robots-strong'}>X:</strong>{robotSelected.x}<br/>
							<strong className={'robots-strong'}>Y:</strong>{robotSelected.y}<br/>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default Robots;