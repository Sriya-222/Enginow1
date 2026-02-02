import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

console.log('--- DIAGNOSTIC START ---');
console.log('Checking Environment Variables...');
if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is missing in .env file!');
    process.exit(1);
} else {
    console.log('MONGO_URI is set.');
}

if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET is missing in .env file!');
} else {
    console.log('JWT_SECRET is set.');
}

console.log('Attempting MongoDB Connection...');
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully!');
} catch (err) {
    console.error('MongoDB Connection FAILED:', err.message);
    process.exit(1);
}

console.log('Checking for Users...');
try {
    const users = await User.find({});
    console.log(`Found ${users.length} users in the database.`);
    if (users.length > 0) {
        console.log('First user:', {
            name: users[0].name,
            email: users[0].email,
            role: users[0].role,
            _id: users[0]._id
        });

        // Check password of the first user (Admin)
        // Note: checking against 'password123'
        const isMatch = await users[0].matchPassword('password123');
        console.log(`Test Login (password123) for ${users[0].email}: ${isMatch ? 'SUCCESS' : 'FAILED'}`);
    } else {
        console.warn('WARNING: No users found! Run "npm run data:import" to seed data.');
    }
} catch (err) {
    console.error('Error querying users:', err.message);
}

console.log('--- DIAGNOSTIC END ---');
process.exit(0);
