'use client';
import { useState } from 'react';
import PostsModal from '@/components/Posts/PostsModal';
import PostSkeleton from '@/components/Skeletons/PostSkeleton';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Props } from 'react-modal';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserPostsModal = ({ pageUsername }: { pageUsername: string }) => {
  const [openPostsModal, setOpenPostsModal] = useState(false);
  const { user }: any = useCurrentUser();
  const { data: userPosts, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${pageUsername}/${user?.id}`,
    fetcher
  );
  if (isLoading || userPosts === undefined) {
    return <PostSkeleton />;
  }

  return (
    <div>
      <Button
        className="min-[508px]:hidden block m-auto my-5 text-lightPink shadow-3xl"
        variant={'outline'}
        onClick={() => setOpenPostsModal(true)}
      >
        View User Posts
      </Button>
      <PostsModal
        isOpen={openPostsModal}
        onRequestClose={() => setOpenPostsModal(false)}
        posts={userPosts}
      />
    </div>
  );
};

export default UserPostsModal;
