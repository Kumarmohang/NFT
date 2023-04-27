import express from 'express';
import artworkTypesController from './artworkTypes.controller';

const router = express.Router();

router.get('/types', artworkTypesController.getTypes);

export default router;
