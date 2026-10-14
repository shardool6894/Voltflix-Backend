const { z } = require('zod');

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'Please enter a strong password (must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character)'
    );

const registerValidation = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: passwordSchema,
    adminSecret: z.string().optional()
});

const loginValidation = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

module.exports = { registerValidation, loginValidation };
