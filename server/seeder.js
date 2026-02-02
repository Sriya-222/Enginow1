import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import courses from './data/courses.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const createdUser = await User.create(user);
            createdUsers.push(createdUser);
        }

        const adminUser = createdUsers[0]._id;

        const sampleCourses = courses.map((course) => {
            return { ...course, user: adminUser };
        });

        await Course.insertMany(sampleCourses);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
