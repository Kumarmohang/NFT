import express from 'express';
// import { handleResponse } from '../../helpers';
import { celebrate } from 'celebrate';
import AuthService from '../../middlewares/auth';
import UserController from './user.controller';
// import { verify } from '../..';
// import { handleResponse } from '../../helpers';
import { uploadFile } from '../../helpers/utils';
import { ProfileGetSchema, AllUsersSchema } from './user.validation';
import { validationFlags } from '../constants';

// const passport = require('passport');

const router = express.Router();
// const jwt = require('jsonwebtoken');

router.get(
  '',
  celebrate({ query: AllUsersSchema }, validationFlags),
  UserController.getAllUsers
);
router.get(
  '/profile',
  celebrate({ query: ProfileGetSchema }),
  UserController.getUser
);
router.post('/login', UserController.loginUser);

const profileUpload = uploadFile.fields([
  { name: 'cover_photo', maxCount: 1 },
  { name: 'profile_photo', maxCount: 1 },
]);
router.put(
  '/edit',
  [AuthService.required, profileUpload],
  UserController.editUser
);
router.get('/:id/history', UserController.userHistory);
router.get('/me', AuthService.required, UserController.jwtUser);
router.delete('/logout', AuthService.required, UserController.logout);
router.get('/owned', UserController.getOwnedNft);
router.get('/collections', UserController.getCollections);
export default router;
