'use client';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
import Comment from '@/components/Comment';
interface CommentsModalProps {
  comments: {
    user: { username: string; image: string };
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
          username={comment?.user?.username}
          profileImage={comment?.user?.image}
          comment={comment?.content}
        />
      ))}
    </ModalWrapper>
  );
};

export default CommentsModal;
