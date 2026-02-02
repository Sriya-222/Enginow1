import Course from '../models/Course.js';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const courses = await Course.find({ ...keyword, ...category });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single course by slug or ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        let course;
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            course = await Course.findById(req.params.id);
        } else {
            course = await Course.findOne({ slug: req.params.id });
        }

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
    const {
        title,
        slug,
        description,
        price,
        category,
        difficulty,
        thumbnailUrl,
        lessons
    } = req.body;

    const course = new Course({
        title,
        slug,
        description,
        price,
        category,
        difficulty,
        thumbnailUrl,
        lessons,
    });

    try {
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
    const {
        title,
        slug,
        description,
        price,
        category,
        difficulty,
        thumbnailUrl,
        lessons
    } = req.body;

    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            course.title = title || course.title;
            course.slug = slug || course.slug;
            course.description = description || course.description;
            course.price = price || course.price;
            course.category = category || course.category;
            course.difficulty = difficulty || course.difficulty;
            course.thumbnailUrl = thumbnailUrl || course.thumbnailUrl;
            course.lessons = lessons || course.lessons;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await Course.deleteOne({ _id: req.params.id });
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
