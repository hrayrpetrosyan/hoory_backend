import express from 'express';
import { signUp, signIn, getProfile } from '../controllers/profile';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/:id', getProfile);

export default router;
