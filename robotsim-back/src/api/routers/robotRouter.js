import express from 'express';
import { getRobots, crateOrUpdateRobot, updateState, updatePosition, getRobotById } from '../controllers/robotController';

const router = express.Router();

router.get('', getRobots);
router.get('/:id', getRobotById);
router.post('', crateOrUpdateRobot);
router.post('/state', updateState);
router.post('/position', updatePosition);

export default router;