import express from 'express';
import { celebrate } from 'celebrate';
import CollectionsController from './collections.controller';
import { uploadFile } from '../../helpers/utils';
import {
  CollectionGetSchema,
  TrendingCollectionGetSchema,
  CollectionLikeSchema,
} from './collections.validation';
// import { validationFlags } from '../constants';
const { validationFlags } = require('../constants');

const router = express.Router();

router.get(
  '',
  celebrate({ query: CollectionGetSchema }, validationFlags),
  CollectionsController.getCollections
);
const imageUpload = uploadFile.fields([
  { name: 'logo_file', maxCount: 1 },
  { name: 'cover_file', maxCount: 1 },
]);

router.post('', imageUpload, CollectionsController.createCollections);
router.put('/:id', imageUpload, CollectionsController.editCollections);
router.get(
  '/trendings',
  celebrate({ query: TrendingCollectionGetSchema }, validationFlags),
  CollectionsController.getTrendingCollections
);
router.get(
  '/:id/like',
  celebrate({ query: CollectionLikeSchema }, validationFlags),
  CollectionsController.toggleCollectionLike
);
router.get('/:id/details', CollectionsController.collectionDetails);

export default router;
