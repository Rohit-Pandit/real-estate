import {
    createLead,
    getAllLeads,
    exportLeadsToExcel
} from  '../controllers/lead.controller.js';

import { Router } from 'express';


const router = Router();

router.post('/create-lead',createLead);
router.get('/get-all-leads',getAllLeads);
router.get('/export-leads',exportLeadsToExcel);

export default router;