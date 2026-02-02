import express from 'express';
import {
    enrollUser,
    getMyEnrollments,
    updateProgress,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, enrollUser);

router.get('/me', protect, getMyEnrollments);
router.put('/:id/progress', protect, updateProgress);

export default router;
