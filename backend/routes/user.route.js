import Router from 'express';

const router = Router();

import { sendverificationcode, verifycode, test, register } from '../controller/user.controller.js';

router.post('/send-verification-code',
    sendverificationcode
);
router.post('/verify-code', verifycode);
router.get('/test', test);
router.post('/register', register);

export default router;