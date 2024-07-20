'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import PostSnippet from '@/components/Posts/Post';
import PostForm from '@/components/Forms/PostForm';
import { Tribe, TribeUser, Post, Like, User, Comment } from '@prisma/client';
import SectionHeader from '@/components/SectionHeader/index';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TribePosts = ({ tribeId }: { tribeId: string }) => {
  const [currentNewPosts, setCurrentNewPosts] = useState<Post[]>([]);
  const { user }: any = useCurrentUser();
  const {
    data: tribePosts,
    isLoading,
    isValidating,
  } = useSWR(
    `http://localhost:3000/tribe/api/posts/${tribeId}/${user.id}`,
    fetcher
  );
  useEffect(() => {
    setCurrentNewPosts(tribePosts?.newPosts);
  }, []);
  if (isLoading || isValidating || tribePosts === undefined) {
    return null;
  }
  return (
    <div>
      <PostForm tribeId={tribeId} />
      <SectionHeader name="Tribe Posts" />
      <div>
        {tribePosts?.posts?.map(
          ({
            id,
            tribe,
            author,
            content,
            authorId,
            likes,
            comments,
            createdAt,
            title,
            edited,
          }: Post & {
            tribe: Tribe & { users: TribeUser[] };
            author: User;
            likes: Like[];
            comments: Comment[];
          }) => (
            <div key={id}>
              <PostSnippet
                username={author.username as string}
                profileImage={author.image as string}
                postContent={content}
                comments={comments as any}
                likes={likes as any}
                createdAt={createdAt as any}
                isAdmin={tribe.adminsUsername.includes(
                  author?.username as string
                )}
                postId={id}
                hasLiked={likes.some((like: any) => like.user.id === user?.id)}
                tribe={tribe as any}
                postTitle={title as string}
                newPosts={currentNewPosts}
                postAuthorId={authorId}
                edited={edited}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TribePosts;
