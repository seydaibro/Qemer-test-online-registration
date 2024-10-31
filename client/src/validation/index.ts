import { z } from "zod";


export const userschema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  age: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phoneNumber: z
  .string()
    .regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signInShcema = z.object({
  email: z
    .string()
    .min(2, { message: "username must be at least 2 characters." }),
  password: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." }),
});

export const courseSchema = z.object({
  name: z.string().nonempty("Course name is required"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  description: z.string().optional(),
  prerequisites: z.string().optional(),
});
