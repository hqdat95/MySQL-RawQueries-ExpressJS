import express from 'express';

const router = express.Router();

import async from '../middlewares/async.middleware';
import * as userCtrl from '../controllers/users.controller';

router.post('/', async(userCtrl.create));

router.get('/', async(userCtrl.findAll));

router.get('/:id', async(userCtrl.findOne));

router.put('/:id', async(userCtrl.update));

router.delete('/:id', async(userCtrl.remove));

export default router;
