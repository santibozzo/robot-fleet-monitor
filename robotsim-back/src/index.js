import { ArgumentParser } from 'argparse';
import Robot from './robot.js';
import Agent from './agent.js';
import { startApiServer } from './api/server';
import settings from './settings';

const processArgs = () => {
  const parser = new ArgumentParser({
    version: '1.0',
    addHelp: true,
    description: 'robot fleet monitor'
  });
  parser.addArgument(['-n'], {
    help: 'Number of robots',
    action: 'store',
    type: Number
  });
  return parser.parseArgs();
};

async function main() {

  await startApiServer();
  if(settings.startSim) {
    const args = processArgs();
    console.log(args);
    const pid = process.pid;
    const robotsCount = args.n || 1;
    console.log(`Starting ${robotsCount} robots with pid=${pid}, use ctrl+c to kill the simulation`);
    const robots = [];
    const agents = [];
    for (let i=0; i<robotsCount; i++) {
      const r = new Robot(`${pid}_${i}`);
      const agent = new Agent(r);
      robots.push(r);
      agents.push(agent);
      await agent.init();
      agent.start();
    }
    console.log(`Simulating ${robotsCount} robots with id prefix ${pid}`);
    setInterval(() => {
      console.log('Robots state:');
      robots.forEach((r) => {
        r.tick();
        console.log('  ' + JSON.stringify(r));
      });
    }, 1000);
  }
}

main();
