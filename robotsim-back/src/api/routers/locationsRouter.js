import express from 'express';
import {getLocations} from "../controllers/locationsController";

const router = express.Router();

router.get('', getLocations);

export default router;