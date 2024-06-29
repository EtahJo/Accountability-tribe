'use client';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
import Comment from '@/components/Comment';
interface CommentsModalProps {
  comments: {
    author: { username: string; image: string };
    content: string;
    id: string;
  }[];
}
const CommentsModal = ({
  isOpen,
  onRequestClose,
  comments,
}: Props & CommentsModalProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white w-[330px]"
    >
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          username={comment?.author?.username}
          profileImage={comment?.author?.image}
          comment={comment?.content}
        />
      ))}
    </ModalWrapper>
  );
};

export default CommentsModal;
