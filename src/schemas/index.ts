import * as z from 'zod';
import { boolean } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.optional(boolean()),
});

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: 'Username must be longer than 4 characters' }),
    email: z.string().email({ message: 'Email is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be more than 6 characters' }),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (data) => {
      if (data.password != data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
    }
  );
