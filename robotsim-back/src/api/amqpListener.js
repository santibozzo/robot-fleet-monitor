import amqp from 'amqplib';
import settings from '../settings.json';
import { updateRobotState, updateRobotPosition } from './services/robotService';

const startAmqpListener = async () => {
	const conn = await amqp.connect(settings.rabbitUrl);

	const channelStatus = await conn.createChannel();
	await channelStatus.assertExchange('robots_data', 'direct', {durable: false});
	const qStatus = await channelStatus.assertQueue('', {exclusive: true});
	channelStatus.bindQueue(qStatus.queue, 'robots_data', 'status');
	channelStatus.consume(qStatus.queue, msg => {
		const data = JSON.parse(msg.content.toString());
		updateRobotState({
			id: data._id,
			location: data.location,
			battery: data.battery,
			mode: data.mode,
			status: data.status
		});
	}, {noAck: true});

	const channelPosition = await conn.createChannel();
	await channelPosition.assertExchange('robots_data', 'direct', {durable: false});
	const qPosition = await channelPosition.assertQueue('', {exclusive: true});
	channelPosition.bindQueue(qPosition.queue, 'robots_data', 'pos');
	channelPosition.consume(qPosition.queue, msg => {
		const data = JSON.parse(msg.content.toString());
		updateRobotPosition({
			id: data._id,
			x: data.x,
			y: data.y,
			location: data.location
		});
	}, {noAck: true});
};

export { startAmqpListener };