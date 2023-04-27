import express from 'express';
import WalletController from './walletExtension.controller';

const router = express.Router();

router.get('', WalletController.getWallet);

export default router;
