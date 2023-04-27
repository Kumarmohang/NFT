import express from 'express';
import ThemesController from './themes.controller';

const router = express.Router();

router.get('', ThemesController.getThemes);

export default router;
