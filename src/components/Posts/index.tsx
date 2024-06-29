'use client';
import { useEffect, useState } from 'react';
import Post from '@/components/Posts/Post';
import { useCurrentUser } from '@/hooks/use-current-user';

interface PostProps {
  posts: {
    comments: {}[];
    content: string;
    id: string;
    authorId: string;
    likes: {}[];
    author: { username: string; image: string };
    tribe: { users: { userRole: string }[] };
  }[];
}

const Posts = ({ posts }: PostProps) => {
  const { user } = useCurrentUser();

  return (
    <div>
      {posts?.map(
        ({ id, tribe, author, content, authorId, likes, comments }) => {
          const admin: {} | undefined = tribe.users.find(
            (user) => (user.userRole = 'ADMIN')
          );
          return (
            <Post
              key={id}
              username={author.username}
              profileImage={author.image}
              postContent={content}
              comments={comments}
              likes={likes}
              isAdmin={authorId === admin?.userId}
              postId={id}
              hasLiked={likes.some((like) => like.user.id === user?.id)}
            />
          );
        }
      )}
    </div>
  );
};

export default Posts;
