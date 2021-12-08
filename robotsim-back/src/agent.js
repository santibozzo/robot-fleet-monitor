import amqp from 'amqplib';
import settings from './settings.json';

const ROBOTS_EXCHANGE = 'robots_data';

export default class Agent {
  constructor(robot) {
    this._robot = robot;
  }

  async init() {
    try {
      const conn = await amqp.connect(settings.rabbitUrl);
      this.chann = await conn.createChannel();
      await this.chann.assertExchange(ROBOTS_EXCHANGE, 'direct', { durable: false });

    } catch(e) {
      console.error('Could not connect to RabbitMQ', e);
    }
  }

  _publishPos() {
    const { x, y, _id, location } = this._robot;
    this.chann.publish(ROBOTS_EXCHANGE, 'pos', Buffer.from(JSON.stringify({
      _id, x, y, location
    })));
  }

  _publishStatus() {
    const { battery, mode, status,_id } = this._robot;
    this.chann.publish(ROBOTS_EXCHANGE, 'status', Buffer.from(JSON.stringify({
      _id, battery, mode, status
    })));
  }

  start() {
    this._posInterval = setInterval(() => { this._publishPos() }, 500 + Math.random() * 1000);
    this._statusInterval = setInterval(() => { this._publishStatus() }, 2000 + Math.random() * 2000);
  }

  stop() {
    clearInterval(this._posInterval);
    clearInterval(this._statusInterval);
  }
}
