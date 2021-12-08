import settings from '../settings.json';
import express from 'express';
import mongoose from 'mongoose';
import robotsRouter from './routers/robotRouter';
import batteryAnomalyRouter from './routers/batteryAnomalyRouter';
import closeCallRouter from './routers/closeCallRouter';
import locationsRouter from './routers/locationsRouter';
import { startAmqpListener } from './amqpListener';

const app = express();

const startApiServer = async () => {
	app.use(express.json());
	app.use('/robots', robotsRouter);
	app.use('/battery-anomalies', batteryAnomalyRouter);
	app.use('/close-calls', closeCallRouter);
	app.use('/locations', locationsRouter);
	app.listen(settings.serverPort, () => console.log(`Server started... listening on port ${settings.serverPort}`));

	const connectionOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	};
	mongoose.Promise = global.Promise;
	try {
		await mongoose.connect(`mongodb://${settings.dbHost}:${settings.dbPort}/robotsim`, connectionOptions);
		console.log('Connected to DB');
		await startAmqpListener();
		console.log('AMQP Listener started');
	}catch(e) {
		console.error(e);
	}
};

export { startApiServer };