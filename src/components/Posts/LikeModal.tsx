'use client';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
import TribeUser from '@/components/Tribe/TribeUsers/TribeUser';
interface LikeModalProps {
  likes: { user: { username: string; image: string } }[];
}

const LikeModal = ({
  isOpen,
  onRequestClose,
  likes,
}: Props & LikeModalProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white w-[330px]"
    >
      {likes.map((like) => (
        <TribeUser
          name={like?.user?.username}
          profileImage={like?.user?.image}
          //   {/* don't want admin to show*/}
          isAdmin={false}
        />
      ))}
    </ModalWrapper>
  );
};

export default LikeModal;
