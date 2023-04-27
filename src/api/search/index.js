import express from 'express';
import search from './search.controller';

const router = express.Router();

router.get('', search.getSearchResults);

export default router;
