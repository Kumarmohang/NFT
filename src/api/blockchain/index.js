import express from 'express';
import AuthService from '../../middlewares/auth';
import BlockchainController from './blockchain.controller';

const router = express.Router();

router.get('/txnHashStatus', BlockchainController.getTxnHashStatus);
router.get('/approvalForAll', BlockchainController.getApprovalForAllStatus);
router.post(
  '/addExistingAsset',
  AuthService.required,
  BlockchainController.addExistingAsset
);
router.get(
  '/externalAssets',
  BlockchainController.getAllExternalSmartContractDetails
);
router.get('/config', BlockchainController.getConfig);

export default router;
