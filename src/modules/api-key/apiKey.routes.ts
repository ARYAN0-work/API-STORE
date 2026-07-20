import { Router } from 'express';

import { authenticate } from '../../middlewares/auth.middleware';
import { createApiKey } from '../api-key/apiKey.contoller';

const router = Router();

router.post('/', authenticate, createApiKey);

export default router;
