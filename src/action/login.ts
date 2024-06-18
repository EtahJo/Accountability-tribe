'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas/index';
import { getUserByEmail } from '@/data/user';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from '@/lib/db';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }
  const { email, password, remember } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'User does not exist!' };
  }

  // TODO : check for email verification
  try {
    await signIn('credentials', {
      email,
      password,
    });
    if (remember) {
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          remember,
        },
      });
    }
    return { success: 'Success' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credential' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};
