'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { CreatePostSchema } from '@/schemas';
import { currentUser } from '@/lib/authentication';
import { getTribeAdmin, getTribeUserByTribeUserId } from '@/data/tribe';
import { getUserById } from '@/data/user';

export const edit_post = async (
  values: z.infer<typeof CreatePostSchema>,
  postId: string
) => {};
