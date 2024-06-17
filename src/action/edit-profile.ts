'use server';
import * as z from 'zod';
import { EditProfileSchema } from '@/schemas/index';
import { currentUser } from '@/lib/authentication';
import { getUserByEmail, getUserById } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
export const editProfile = async (
  values: z.infer<typeof EditProfileSchema>
) => {
  //   const validatedFields = EditProfileSchema.safeParse(values);
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorized user :no user' };
  }
  console.log('This is the user', user);
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorized user :no dbsuer' };
  }
  //   const userData = validatedFields.data;
  if (values?.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id === user.id) {
      return { error: 'Email already in use' };
    }
  }
  if (values?.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: 'Incorrect password!' };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  console.log('to be updated', values);
  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });
  return { success: 'User Data Updated' };
};
