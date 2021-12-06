import express from 'express';
import { getCloseCalls } from '../controllers/closeCallController';

const router = express.Router();

router.get('', getCloseCalls);

export default router;