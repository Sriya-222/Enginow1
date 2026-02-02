import mongoose from 'mongoose';

const enrollmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    // Map logic: key is lessonId, value is boolean (completed)
    // Or simpler: array of completed lesson IDs
    completedLessons: [{
        type: String // or mongoose.Schema.Types.ObjectId if lessons have IDs
    }],
    isCompleted: {
        type: Boolean,
        default: false,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Prevent double enrollment
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
