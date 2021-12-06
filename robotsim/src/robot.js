import _ from 'lodash';

const MAP_SIDE = 30;

const ROBOT_MODE = {
  MISSION: 'MISSION',
  IDLE: 'IDLE',
  DOCKED: 'DOCKED',
  URGENT_DOCK: 'URGENT_DOCK'
};

const ROBOT_STATUS = {
  OK: 'OK',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
};

const DOCK_POSITION = { x: 0, y: 0 };


const GOALS = [
  { x: -MAP_SIDE, y: -MAP_SIDE },
  { x: MAP_SIDE, y: -MAP_SIDE },
  { x: -MAP_SIDE, y: MAP_SIDE },
  { x: MAP_SIDE, y: MAP_SIDE },
];

export default class Robot {
  constructor(id) {
    this.x = Math.floor(-MAP_SIDE + Math.random() * 2 * MAP_SIDE);
    this.y = Math.floor(-MAP_SIDE + Math.random() * 2 * MAP_SIDE);
    this._id = id;
    this.battery = 50 + Math.random()*50;
    this.mode = ROBOT_MODE.IDLE;
    this.status = ROBOT_STATUS.OK;
    this._goal = _.sample(GOALS);
    this.location = Math.random().toString(36).substr(2, 2);
  }

  id = () => (
    this._id
  )

  tick() {
    // Auto-dock
    if (this.battery < 10 && this.status != ROBOT_STATUS.ERROR) {
      this.status = ROBOT_STATUS.WARNING;
      this._goal = DOCK_POSITION;
    }

    // Missions sim
    if (this.x == this._goal.x && this.y == this._goal.y) {
      // Robot is in the goal
      // Battery sim
      if (this.x == DOCK_POSITION.x && this.y == DOCK_POSITION.y) {
        if (this.battery === undefined || isNaN(this.battery)) {
          this.battery = 1;
        }
        this.battery = Math.min(100, this.battery + 10 * Math.random());
        this.mode = ROBOT_MODE.DOCKED;
        if (this.battery < 85) {
          return;
        }
        this.status = ROBOT_STATUS.OK;
      } else {
        this.battery = Math.max(1, this.battery - 1 * Math.random());
        this.mode = ROBOT_MODE.IDLE;
      }

      if (Math.random() < 0.25) {
        // 25% chances to pick another goal (or maybe the same again)
        // this simulates spending time in the goal completing the mission
        this._goal = this.battery < 25 ? DOCK_POSITION : _.sample(GOALS);
      }
    } else if (Math.random() < 1/200) {
      // Once in a while, battery goes wrong (anomaly)
      this.battery = this.battery > 60 ? this.battery - 50 : this.battery + 30;
      console.log(`Battery anomaly in robot ${this._id}! Now battery=${this.battery}`)
    } else {

      this.battery = Math.max(1, this.battery - 2 * Math.random());
      this.mode = this.battery < 10 ? ROBOT_MODE.URGENT_DOCK : ROBOT_MODE.MISSION;
      // Move to the goal, max speed 3 in each direction
      const diffX = this._goal.x - this.x;
      const diffY = this._goal.y - this.y;
      this.x += Math.sign(diffX) * Math.ceil(Math.random() * Math.min(5, Math.abs(diffX)));
      this.y += Math.sign(diffY) * Math.ceil(Math.random() * Math.min(5, Math.abs(diffY)));

      if (Math.random() < 0.002) {
        // Random failure, stop reporting battery, go to the dock to clear
        this.status = ROBOT_STATUS.ERROR;
        this.battery = undefined;
        this._goal = DOCK_POSITION;
      }
    }

  }
}
