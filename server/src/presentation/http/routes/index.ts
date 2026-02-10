import { Router } from 'express';
import authRoutes from './authRoutes';
import candidateRoutes from './candidateRoutes';

const router = Router();
console.log('from auth routes');

router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);

export default router;
