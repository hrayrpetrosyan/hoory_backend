import express from 'express';
import { createAssistant, updateAssistant, getAssistants } from '../controllers/assistant';

const router = express.Router();

router.get('/:profileId', getAssistants);
router.post('/', createAssistant);
router.patch('/:id', updateAssistant);

export default router;
