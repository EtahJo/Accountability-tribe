'use client';
import PostsModal from '@/components/Posts/PostsModal';
import PostSkeleton from '@/components/Skeletons/PostSkeleton';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Props } from 'react-modal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserPostsModal = ({
  pageUsername,
  isOpen,
  onRequestClose,
}: Props & { pageUsername: string }) => {
  const { user }: any = useCurrentUser();
  const { data: userPosts, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${pageUsername}/${user?.id}`,
    fetcher
  );
  if (isLoading || userPosts === undefined) {
    return <PostSkeleton />;
  }

  return (
    <PostsModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      posts={userPosts}
    />
  );
};

export default UserPostsModal;
