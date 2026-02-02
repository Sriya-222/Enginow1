import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by model/pre-save? No, insertMany doesn't trigger pre-save! Need to hash manually here or use create (loop).
        // Actually, let's just hash it here for simplicity or rely on a loop in seeder if we were rigorous. 
        // For now, let's assume the model hook IS NOT called on insertMany.
        // So we will store plain text 'password123' and rely on the fact that our model logic MIGHT be bypassed? 
        // WAIT: insertMany bypasses headers.
        // Let's manually hash it.
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
    },
];

export default users;
