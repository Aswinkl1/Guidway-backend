import { Role } from '@domain/entities/user';
import { z } from 'zod';
export const signupUserSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  name: z
    .string('Name is required.')
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name cannot exceed 100 characters.'),
  password: z
    .string('Password is required.')
    .trim()
    .min(8, 'Password must be at least 8 characters.')

    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
  phoneNumber: z
    .string('Phone number is required.')
    .min(10, 'Phone number must be at least 10 characters.')
    // Optional: basic regex to ensure it only contains numbers, spaces, or common phone symbols (+, -, ())
    .regex(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number format.'),
  // Added Role Enum
  role: z.enum(Role),
});

export type signupUserDTO = z.infer<typeof signupUserSchema>;
