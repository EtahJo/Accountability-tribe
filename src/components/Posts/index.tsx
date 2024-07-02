'use client';
import Post from '@/components/Posts/Post';
import { useCurrentUser } from '@/hooks/use-current-user';
import SectionHeader from '@/components/SectionHeader';

interface PostProps {
  posts: {
    comments: {}[];
    content: string;
    id: string;
    authorId: string;
    likes: {}[];
    author: { username: string; image: string };
    tribe: { users: { userRole: string }[] };
    createdAt: string;
  }[];
}

const Posts = ({ posts }: PostProps) => {
  const { user } = useCurrentUser();
  return (
    <div>
      <SectionHeader name="Shared Experiences and Lots More" />
      {posts?.map(
        ({
          id,
          tribe,
          author,
          content,
          authorId,
          likes,
          comments,
          createdAt,
        }) => {
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
              createdAt={createdAt}
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
