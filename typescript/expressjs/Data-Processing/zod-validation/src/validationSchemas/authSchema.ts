import { z } from 'zod';

export const userRegistrationSchema = z.object({
    name: z.string().min(1).max(255).trim().optional(),
    email: z.string().email().trim(),
    username: z.string().min(3).max(30),
    password: z.string()
    .min(8)
    .refine(value => /^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value), {
        message: "required to contain at least one number and one special character (!@#$%^&*)"
    }),
    images: z.array(z.string()).optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});