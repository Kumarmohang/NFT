import express from 'express';
import { celebrate } from 'celebrate';
import trending from './seller.controller';
import { TrendingSellerGetSchema, SellerGetSchema } from './seller.validation';

const { validationFlags } = require('../constants');

const router = express.Router();

router.get('', celebrate({ query: SellerGetSchema }), trending.getSellers);
router.get(
  '/trendings',
  celebrate({ query: TrendingSellerGetSchema }, validationFlags),
  trending.getTrendingSellers
);

export default router;
