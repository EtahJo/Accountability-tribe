'use server';

import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';

export const check_user = async () => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not Authorised' };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: 'Not Authorised' };
  }
  return dbUser;
};
