import express from 'express';
import TypesController from './types.controller';

const router = express.Router();

router.get('', TypesController.getTypes);

export default router;
