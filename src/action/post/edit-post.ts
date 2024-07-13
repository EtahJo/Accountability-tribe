'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { EditPostSchema } from '@/schemas';
import { currentUser } from '@/lib/authentication';
import { getTribeAdmin } from '@/data/tribe';
import { getPostById } from '@/data/post';
import { getUserById } from '@/data/user';

export const edit_post = async (
  values: z.infer<typeof EditPostSchema>,
  postId: string
) => {
  const validatedFields = EditPostSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid field' };
  }
  const user = await currentUser();
  if (!user) {
    return { error: 'Sign up or login to post' };
  }
  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: 'Unauthorised User' };
  }
  const { content, title } = validatedFields.data;
  const post = await getPostById(postId);
  if (!post) {
    return { error: 'Post does not exist' };
  }
  if (post?.authorId !== dbUser.id) {
    return { error: 'You are not the creator of this post' };
  }
  const tribeAdmin = await getTribeAdmin(post.tribeId);
  const approved = tribeAdmin?.id === post.authorId ? true : false;
  const postEdit = await db.postEdit.create({
    data: {
      postId,
      title,
      content,
      approved,
    },
  });
  if (tribeAdmin?.id === post.authorId) {
    await db.post.update({
      where: { id: postId },
      data: {
        title: postEdit.title,
        content: postEdit.content,
      },
    });
    return { success: 'Changes made' };
  }
  return { success: 'Changes pending review' };
};
