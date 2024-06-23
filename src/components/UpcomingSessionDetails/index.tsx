'use client';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
interface UpcomingSessionDetailProps {}

const UpcomingSessionDetail = ({ isOpen, onRequestClose }: Props) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Session Details"
    >
      UpcomingSessionDetail
    </ModalWrapper>
  );
};

export default UpcomingSessionDetail;
