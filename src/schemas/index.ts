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

export const EditProfileSchema = z
  .object({
    username: z.optional(
      z
        .string()
        .min(4, { message: 'Username must be longer than 4 characters' })
    ),
    email: z.optional(z.string().email({ message: 'Email is required' })),
    password: z.optional(
      z.string().min(6, { message: 'Password must be more than 6 characters' })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: 'Password must be more than 6 characters' })
    ),
    remember: z.optional(z.boolean()),
    number: z.optional(z.string()),
    linkedIn: z.optional(z.string()),
    facebook: z.optional(z.string()),
    X: z.optional(z.string()),
    image: z.optional(z.string()),
    country: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Fill both new password and password or none',
      path: ['newPassword'],
    }
  );
