'use client';
import Post from '@/components/Posts/Post';
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
  pageUsername: string;
}

const Posts = ({ posts, pageUsername }: PostProps) => {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  if (posts.length === 0 && pathname.startsWith('/tribe')) {
    return (
      <div className="bg-white p-2 rounded-3xl shadow-3xl">
        <p className="font-bold text-2xl text-center">
          Be the first to post in tribe
        </p>
      </div>
    );
  } else if (posts.length === 0 && !pathname.startsWith('/tribe')) {
    return (
      <div className="bg-white p-2 rounded-3xl shadow-3xl">
        <p className="font-bold text-2xl text-center">No posts</p>
      </div>
    );
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
            }) => {
              const admin: {} | undefined = tribe.users.find(
                (user) => (user.userRole = 'ADMIN')
              );
              return (
                <CarouselItem className="">
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
