'use client';
import ModalWrapper from '@/components/ModalWrap/index';
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
      className="w-max"
    >
      <div className="bg-white p-3 rounded-3xl shadow-3xl">
        {likes?.map((like, index) => (
          <TribeUser
            key={index}
            name={like?.user?.username}
            profileImage={like?.user?.image}
            //   {/* don't want admin to show*/}
            isAdmin={false}
          />
        ))}
      </div>
    </ModalWrapper>
  );
};

export default LikeModal;
