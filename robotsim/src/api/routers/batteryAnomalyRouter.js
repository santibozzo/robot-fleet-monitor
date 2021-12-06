import express from 'express';
import { getBatteryAnomalies } from '../controllers/batteryAnomalyController';

const router = express.Router();

router.get('', getBatteryAnomalies);

export default router;