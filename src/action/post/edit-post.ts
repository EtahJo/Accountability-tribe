'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { EditPostSchema } from '@/schemas';
import { currentUser } from '@/lib/authentication';
import { getSpecificTribeAdmin, getAllTribeAdmins } from '@/data/tribe';
import { getPostById } from '@/data/post';
import { getUserById } from '@/data/user';
import { revalidateTag } from 'next/cache';

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
  const tribeAdmin = await getSpecificTribeAdmin(post.tribeId, dbUser.id);
  const approved =
    tribeAdmin && tribeAdmin?.id === post.authorId ? true : false;
  const postEdit = await db.postEdit.create({
    data: {
      postId,
      title,
      content,
      approved,
    },
  });
  if (tribeAdmin?.userId === post.authorId) {
    await db.post.update({
      where: { id: postId },
      data: {
        title: postEdit.title,
        content: postEdit.content,
        edited: true,
      },
    });
    return { success: 'Changes made' };
  }
  const allTribeAdmins = await getAllTribeAdmins(post.tribeId);
  if (allTribeAdmins && !tribeAdmin) {
    await db.$transaction(
      allTribeAdmins?.map((admin) =>
        db.notification.create({
          data: {
            userId: admin.userId,
            message: 'An edit made to post and pending review',
            type: 'ADMINTASK',
          },
        })
      )
    );
  }
  revalidateTag('tribePosts');
  return { success: 'Changes pending review' };
};
