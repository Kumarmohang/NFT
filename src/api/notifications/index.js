import express from 'express';
import notificationsController from './notifications.controller';

const router = express.Router();

router.get('/:id', notificationsController.getNotifications);
router.post('/:id', notificationsController.createNotifications);

export default router;
