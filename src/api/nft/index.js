/* eslint-disable no-unused-vars */
import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from 'passport';
import AuthService from '../../middlewares/auth';
// import { validationFlags } from '../constants';
import nftsController from './nft.controller';
import {
  NftGetSchema,
  TrendingNftGetSchema,
  NftLikeSchema,
  NftHistorySchema,
} from './nft.validation';
import { uploadFile } from '../../helpers/utils';

const router = express.Router();
const { validationFlags } = require('../constants');

router.get(
  '',
  [AuthService.required, celebrate({ query: NftGetSchema }, validationFlags)],
  nftsController.getNfts
);
const artworkUpload = uploadFile.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

// const publishArtwork = uploadFile.fields([{ name: 'file', maxCount: 1 }]);

router.post(
  '',
  [AuthService.required, artworkUpload],
  nftsController.createNfts
);

router.put('/:id/publish', AuthService.required, nftsController.publishNft);
router.put('/:id', nftsController.editNfts);
router.get('/:id/details', nftsController.nftDetails);
router.get(
  '/:id/history',
  celebrate({ query: NftHistorySchema }, validationFlags),
  nftsController.nftHistory
);
router.put(
  '/:id/like',
  AuthService.required,
  celebrate({ body: NftLikeSchema }, validationFlags),
  nftsController.toggleNftLike
);
router.get(
  '/trendings',
  celebrate({ query: TrendingNftGetSchema }, validationFlags),
  nftsController.getTrendingNfts
);
router.post(
  '/:id/buy/initiate',
  AuthService.required,
  nftsController.initiateBuyTransaction
);
router.put('/:id/buy/success', AuthService.required, nftsController.buyNfts);
router.post('/:id/sell', AuthService.required, nftsController.sellNfts);
router.put('/:id/cancel', nftsController.cancelNfts);
router.put('/:id/mint/success', nftsController.mintNft);
router.post('/:id/mint/initiate', nftsController.initiateMint);

export default router;
