import express from 'express';
import { createAssistant, updateAssistant, getAssistants, deleteAssistant } from '../controllers/assistant';

const router = express.Router();

router.get('/', getAssistants);
router.post('/', createAssistant);
router.patch('/:id', updateAssistant);
router.delete('/:id', deleteAssistant);

export default router;
