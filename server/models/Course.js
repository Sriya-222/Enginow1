import mongoose from 'mongoose';

const lessonSchema = mongoose.Schema({
    title: { type: String, required: true },
    contentHtml: { type: String, required: true },
    videoUrl: { type: String },
    order: { type: Number, required: true },
});

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    thumbnailUrl: {
        type: String,
    },
    lessons: [lessonSchema],
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
