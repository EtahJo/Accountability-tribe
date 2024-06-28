'use client';
import { useEffect, useState } from 'react';
import Post from '@/components/Posts/Post';

const Posts = ({ tribeId }: { tribeId: string }) => {
  const [posts, setPosts] = useState<
    | {
        comments: {}[];
        content: string;
        id: string;
        authorId: string;
        likes: {}[];
        author: { username: string; image: string };
        tribe: { users: { userRole: string }[] };
      }[]
    | null
  >(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/tribe/api/posts/${tribeId}`, {
          headers: {
            accept: 'application/json',
            method: 'GET',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log('Posts >>>', data);
        setPosts(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [tribeId]);
  if (error) {
    return (
      <div>
        <p>{'Error:' + error}</p>
      </div>
    );
  }

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
            />
          );
        }
      )}
    </div>
  );
};

export default Posts;
