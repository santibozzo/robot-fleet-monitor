import {useParams, useNavigate} from 'react-router-dom';
import Button from "../../components/Button";
import './Location.css';

const Location = props => {
	const {locationId} = useParams();
	const navigate = useNavigate();

	return (
		<div className={'location-div'}>
			<h1>{`Depósito ${locationId}`}</h1>
			<Button
				className={'location-button'}
				style={'blue'}
				text={'Robots'}
				onClick={() => navigate(`/locations/${locationId}/robots`)}
			/>
			<Button
				className={'location-button'}
				style={'yellow'}
				text={'Alertas de baterías'}
				onClick={() => navigate(`/locations/${locationId}/battery-anomalies`)}
			/>
			<Button
				className={'location-button'}
				style={'red'}
				text={'Alertas de colisiones'}
				onClick={() => navigate(`/locations/${locationId}/close-calls`)}
			/>
		</div>
	);
};

export default Location;