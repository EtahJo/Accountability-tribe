'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CommentsModal from '@/components/Posts/CommentsModal';

import { getDuration } from '@/util/DateTime';
import { Tribe, TribeVisit, Post, Comment, User } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import PostContent from '@/components/Posts/PostContent';
import PostTitle from '@/components/Posts/PostTitle';
import PostLikeSection from './PostLikeSection';
import PostCommentSection from './PostCommentSection';
import PostHeaderSection from './PostHeaderSection';

type OneCommentProps = Pick<
  Comment,
  'authorId' | 'content' | 'createdAt' | 'edited' | 'id' | 'parentId'
> & {
  likes: { user: Pick<User, 'username' | 'id' | 'image'> }[];
  author: Pick<User, 'username' | 'image'>;
  replies: OneCommentProps[];
};

interface PostProps {
  postId: string;
  profileImage: string;
  username: string;
  isAdmin: boolean;
  postContent: string;
  postTitle: string;
  hasLiked: boolean;
  edited: boolean;
  postAuthorId: string;
  tribe?: Tribe & { tribeVisit: TribeVisit[] };
  likes: { user: { username: string; image: string; id: string } }[];
  comments: OneCommentProps[];
  createdAt: string;
  newPosts?: Post[];
  postEditTitle?: string;
  postEditContent?: string;
}
const PostSnippet = ({
  postId,
  profileImage,
  username,
  isAdmin,
  postContent,
  likes,
  comments,
  hasLiked,
  createdAt,
  tribe,
  postTitle,
  postAuthorId,
  newPosts,
  edited,
  postEditTitle,
  postEditContent,
}: PostProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const pathname = usePathname();
  const showNewPostConditionOne =
    tribe?.tribeVisit?.length === 1 &&
    new Date(createdAt) > new Date(tribe?.tribeVisit[0]?.lastVisit);
  const showNewPostConditionTwo =
    newPosts?.some((post) => post.id == postId) &&
    pathname.startsWith('/tribe');

  const NowDateTime = new Date();
  const theDuration = getDuration(createdAt, NowDateTime.toISOString());
  const duration =
    parseInt(theDuration.minutes) < 60
      ? Math.floor(parseInt(theDuration.minutes)) + ' m'
      : theDuration.hours < 48
      ? Math.floor(theDuration.hours) + ' h'
      : Math.floor(theDuration.days) < 30
      ? Math.floor(theDuration.days) + ' days'
      : theDuration.weeks.weeks + 'w';
  return (
    <div
      className="bg-white rounded-2xl largePhone:p-5  my-5 relative w-full p-2 "
      id={postId}
    >
      <PostHeaderSection
        username={username}
        profileImage={profileImage}
        duration={duration}
        isAdmin={isAdmin}
        edited={edited}
        postAuthorId={postAuthorId}
        postId={postId}
        postContent={postContent}
        postTitle={postTitle}
        tribe={tribe}
      />
      {showNewPostConditionOne ? (
        <Badge className="absolute top-0 right-0 bg-purple rounded-2xl">
          New Post
        </Badge>
      ) : (
        showNewPostConditionTwo && (
          <Badge className="absolute top-0 right-0 bg-purple rounded-2xl">
            New to Tribe
          </Badge>
        )
      )}

      <div
        className=" bg-lighterPink rounded-2xl largePhone:p-5 mt-6 mb-4
      flex flex-col w-full gap-y-2 p-2"
      >
        <PostTitle postEditTitle={postEditTitle} postTitle={postTitle} />

        <PostContent
          postContent={postContent}
          postEditContent={postEditContent}
        />
      </div>
      <div className="flex justify-between items-center mx-2">
        <PostLikeSection likes={likes} hasLiked={hasLiked} postId={postId} />

        {comments.length > 0 && (
          <p
            className="text-lightPink cursor-pointer text-xs"
            onClick={() => setOpenCommentModal(true)}
          >
            {comments.length} {comments.length > 1 ? 'comments' : 'comment'}
          </p>
        )}
      </div>
      <PostCommentSection
        comments={comments}
        isAdmin={isAdmin}
        postId={postId}
      />
      <CommentsModal
        isOpen={openCommentModal}
        onRequestClose={() => setOpenCommentModal(false)}
        comments={comments as any}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default PostSnippet;
