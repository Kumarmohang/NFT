import express from 'express';
import landingPageStatsController from './landingPageStats.controller';

const router = express.Router();

router.get('/top_stats', landingPageStatsController.getTopStats);

export default router;
