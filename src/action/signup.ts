'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas/index';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    console.log('Invalid field');
    return { error: 'Invalid fields!' };
  }
  const { username, email, password, timezone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return {
      error: 'Email already exists',
    };
  }
  const user = await db.user.create({
    data: {
      username,
      email,
      timezone,
      password: hashedPassword,
    },
  });
  return { success: 'User Created' };
};
