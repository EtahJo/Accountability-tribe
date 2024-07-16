'use server';
import * as z from 'zod';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/authentication';
import { getUserById } from '@/data/user';
import { getCommentById } from '@/data/comment';
import { CreateCommentSchema } from '@/schemas/index';
import { getPostById } from '@/data/post';
import { check_user } from '@/action/check-user';

export const edit_comment = async (
  values: z.infer<typeof CreateCommentSchema>,
  commentId: string
) => {
  const dbUser = await check_user();
  const comment = await getCommentById(commentId);
};
