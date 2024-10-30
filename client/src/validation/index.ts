import { z } from "zod";


export const courseSchema = z.object({
  courseName: z.string().min(1, 'Course name is required'),
  duration: z.string().min(1, 'Duration is required'),
  image: z.instanceof(File).refine((file) => file && file.size > 0, {
    message: 'An image file is required',
  }),
 
});

export const signInShcema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters." }),
  password: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." }),
});
