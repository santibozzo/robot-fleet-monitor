import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router";
import Button from "../../components/Button";
import {getLocations} from "../../api/backApi";
import './Locations.css';

const Locations = props => {
	const navigate = useNavigate();
	const [locations, setLocations] = useState([]);

	const init = async () => {
		const newLocations = await getLocations();
		setLocations(newLocations);
	};

	useEffect(init, []);

	return (
		<div className={'locations-div'}>
			<h1>{`Depósitos`}</h1>
			{locations.map(l => (
				<Button
					className={'locations-button'}
					style={'blue'}
					text={`Depósito ${l}`}
					onClick={() => navigate(`/locations/${l}`)}
				/>
			))}
		</div>
	);
};

export default Locations;