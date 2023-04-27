import express from 'express';
import { celebrate } from 'celebrate';
import AuthService from '../../middlewares/auth';
import artworkController from './artworks.controller';
import {
  artworkIdValidateSchema,
  artworkIdsValidateSchema,
  artworkSearchSchema,
  referenceIdDetailsValidateSchema,
} from './artworks.validation';

const router = express.Router();

router.get(
  '/',
  AuthService.optional,
  celebrate(
    { query: artworkSearchSchema },
    { abortEarly: false, allowUnknown: true, stripUnknown: true }
  ),
  artworkController.searchArtwork
);

router.get(
  '/:artworkId/details',
  AuthService.optional,
  celebrate({
    params: artworkIdValidateSchema,
    query: referenceIdDetailsValidateSchema,
  }),
  artworkController.getArtworkDetails
);

router.get(
  '/details',
  AuthService.optional,
  celebrate({ query: artworkIdsValidateSchema }),
  artworkController.getMultipleArtworkDetails
);

router.get(
  '/:artworkId/auctions',
  AuthService.optional,
  celebrate({ params: artworkIdValidateSchema }),
  artworkController.getArtworkAuctions
);

router.get(
  '/:artworkId/metadata',
  AuthService.optional,
  celebrate({ params: artworkIdValidateSchema }),
  artworkController.getArtworkMetadata
);

router.get(
  '/metadata',
  AuthService.optional,
  celebrate({ query: artworkIdsValidateSchema }),
  artworkController.getMultipleArtworkMetadata
);

export default router;
