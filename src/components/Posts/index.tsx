'use client';
import PostSnippet from '@/components/Posts/Post';
import { useCurrentUser } from '@/hooks/use-current-user';
import SectionHeader from '@/components/SectionHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { usePathname } from 'next/navigation';
import { Tribe, TribeUser, Post } from '@prisma/client';

interface PostProps {
  posts: {
    comments: {}[];
    content: string;
    title: string;
    id: string;
    authorId: string;
    edited: boolean;
    likes: {}[];
    author: { username: string; image: string };
    tribe: Tribe & { users: TribeUser[] };
    createdAt: string;
  }[];
  pageUsername: string;
  newPosts: Post[];
}

const Posts = ({ posts, pageUsername, newPosts }: PostProps) => {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  if (posts?.length === 0 && pathname.startsWith('/tribe')) {
    return (
      <div className="bg-white p-2 rounded-3xl shadow-3xl">
        <p className="font-bold text-2xl text-center">
          Be the first to post in tribe
        </p>
      </div>
    );
  } else if (posts?.length === 0 && !pathname.startsWith('/tribe')) {
    return null;
  }
  return (
    <div>
      <SectionHeader
        name="Shared Experiences and Lots More"
        pageUsername={pageUsername}
      />
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full "
      >
        <CarouselContent className="w-full">
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
              title,
              edited,
            }) => {
              const admin: {} | undefined = tribe?.users.find(
                (user) => (user.userRole = 'ADMIN')
              );
              return (
                <CarouselItem className="">
                  <PostSnippet
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
                    tribe={tribe}
                    postTitle={title}
                    newPosts={newPosts}
                    postAuthorId={authorId}
                    edited={edited}
                  />
                </CarouselItem>
              );
            }
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Posts;
