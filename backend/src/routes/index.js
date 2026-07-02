import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import hospitalRoutes from './hospitalRoutes.js';
import treatmentRoutes from './treatmentRoutes.js';
import packageRoutes from './packageRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import faqRoutes from './faqRoutes.js';
import contactRoutes from './contactRoutes.js';
import partnerRoutes from './partnerRoutes.js';
import mediaRoutes from './mediaRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/treatments', treatmentRoutes);
router.use('/packages', packageRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/contacts', contactRoutes);
router.use('/partners', partnerRoutes);
router.use('/media', mediaRoutes);

export default router;
