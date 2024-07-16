'use client';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
import Comment from '@/components/Comment';
import { useCurrentUser } from '@/hooks/use-current-user';

interface CommentsModalProps {
  comments: {
    author: { username: string; image: string };
    content: string;
    id: string;
    edited: boolean;
    createdAt: string;
    commentId: string;
    commentLiked: boolean;
    likes: { user: { username: string; image: string; id: string } }[];
    parentId: string;
    commentLikes: { user: { username: string; image: string } }[];
    replies: {
      author: { username: string; image: string };
      content: string;
      id: string;
      edited: boolean;
      createdAt: string;
      likes: { user: { username: string; image: string; id: string } }[];
      parentId: string;
      replies: {
        author: { username: string; image: string };
        content: string;
        id: string;
        createdAt: string;
        likes: { user: { username: string; image: string; id: string } }[];
        parentId: string;
      }[];
    }[];
  }[];
}
const CommentsModal = ({
  isOpen,
  onRequestClose,
  comments,
}: Props & CommentsModalProps) => {
  const { user } = useCurrentUser();
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-5 w-3/4"
    >
      {comments?.map(
        (comment) =>
          !comment.parentId && (
            <Comment
              key={comment?.id}
              authorUsername={comment?.author?.username}
              profileImage={comment?.author?.image}
              comment={comment?.content}
              createdAt={comment.createdAt}
              commentLiked={comment.likes?.some(
                (like) => like.user.id === user?.id
              )}
              commentLikes={comment.likes}
              commentId={comment.id}
              replies={comment.replies}
              edited={comment.edited}
            />
          )
      )}
    </ModalWrapper>
  );
};

export default CommentsModal;
