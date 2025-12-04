import { healthcheck } from "../controllers/healthcheck.controller.js";

import { Router } from 'express';

const router = Router();

router.post('/', healthcheck);

export default router;