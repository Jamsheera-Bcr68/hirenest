import { Router } from 'express';
import authRoutes from './authRoutes';
import candidateRoutes from './candidateRoutes';
import skillRoutes from './skillRoutes'

const router = Router();
console.log('from auth routes');

router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);
router.use('/skills', skillRoutes);

export default router;
