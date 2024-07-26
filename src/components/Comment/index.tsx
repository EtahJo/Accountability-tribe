'use client';
import { useState, useEffect } from 'react';
import { getDuration } from '@/util/DateTime';
import CommentResponseForm from '../Forms/CommentResponseForm';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import CommentLikeSection from './CommentLikeSection';
import CommentHeader from './CommentHeader';
import EditComment from '@/components/Comment/EditComment';
import CommentReplies from './CommentReplies';

interface CommentProps {
  profileImage: string;
  authorUsername: string;
  authorId: string;
  comment: string;
  isAdmin: boolean;
  commentLiked: boolean;
  edited: boolean;
  commentLikes: { user: { username: string; image: string } }[];
  createdAt: string;
  commentId: string;
  replies: {
    author: { username: string; image: string };
    content: string;
    id: string;
    edited: boolean;
    authorId: string;
    createdAt: string;
    likes: { user: { username: string; image: string; id: string } }[];
    parentId: string;
    replies: {
      author: { username: string; image: string };
      content: string;
      id: string;
      authorId: string;
      createdAt: string;
      likes: { user: { username: string; image: string; id: string } }[];
      parentId: string;
    }[];
  }[];
}
const Comment = ({
  profileImage,
  authorUsername,
  authorId,
  comment,
  commentLiked,
  createdAt,
  commentId,
  commentLikes,
  replies,
  isAdmin,
  edited,
}: CommentProps) => {
  const [responding, setResponding] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const activeHash = window?.location.hash;
    const activeId = activeHash.split('#')[1];
    setActiveId(activeId);
  }, []);

  const { user }: any = useCurrentUser();
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
      className={cn(
        'flex flex-col gap-y-1 border-b-2 border-b-gray-200 m-2 pb-2 relative',
        activeId === commentId
          ? 'bg-lighterPink p-2 rounded-md mb-4'
          : 'bg-transparent'
      )}
      id={commentId}
    >
      <CommentHeader
        authorId={authorId}
        authorUsername={authorUsername}
        profileImage={profileImage}
        isAdmin={isAdmin}
        commentId={commentId}
        duration={duration}
        showEditFunction={() => setEditComment(true)}
      />

      <div
        className=" flex justify-between largePhone:items-center  
      largePhone:flex-row flex-col items-start ml-6 largePhone:ml-10"
      >
        <EditComment
          comment={comment}
          commentId={commentId}
          edited={edited}
          editComment={editComment}
          setEditComment={setEditComment}
        />

        <div className="flex gap-2 items-center">
          <CommentLikeSection
            commentId={commentId}
            commentLiked={commentLiked}
            commentLikes={commentLikes}
          />

          <CommentReplies
            replies={replies}
            setResponding={setResponding}
            setShowReplies={setShowReplies}
          />
        </div>
      </div>
      <CommentResponseForm
        commentId={commentId}
        responding={responding}
        setResponding={setResponding}
      />
      {showReplies && (
        <div>
          {replies.map((reply) => (
            <div key={reply.id}>
              <Comment
                profileImage={reply.author.image}
                authorId={reply.authorId}
                authorUsername={reply.author.username}
                comment={reply.content}
                createdAt={reply.createdAt}
                commentLiked={reply.likes?.some(
                  (like) => like.user.id === user?.id
                )}
                commentLikes={reply.likes}
                commentId={reply.id}
                replies={reply.replies as any}
                edited={reply.edited}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
