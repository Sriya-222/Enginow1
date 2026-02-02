import Enrollment from '../models/Enrollment.js';

// @desc    Enroll user in a course
// @route   POST /api/enrollments
// @access  Private
const enrollUser = async (req, res) => {
    const { courseId } = req.body;

    try {
        const enrollmentExists = await Enrollment.findOne({
            user: req.user._id,
            course: courseId,
        });

        if (enrollmentExists) {
            res.status(400).json({ message: 'User already enrolled in this course' });
            return;
        }

        const enrollment = await Enrollment.create({
            user: req.user._id,
            course: courseId,
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user's enrollments
// @route   GET /api/enrollments/me
// @access  Private
const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id })
            .populate('course', 'title slug thumbnailUrl difficulty category'); // Populate specific fields

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update course progress (mark lesson as completed)
// @route   PUT /api/enrollments/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
    const { lessonId } = req.body;

    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (enrollment) {
            // Ensure user owns this enrollment
            if (enrollment.user.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            // Add lessonId to completedLessons if not already there
            if (!enrollment.completedLessons.includes(lessonId)) {
                enrollment.completedLessons.push(lessonId);
            }

            const updatedEnrollment = await enrollment.save();
            res.json(updatedEnrollment);
        } else {
            res.status(404).json({ message: 'Enrollment not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    enrollUser,
    getMyEnrollments,
    updateProgress,
};
