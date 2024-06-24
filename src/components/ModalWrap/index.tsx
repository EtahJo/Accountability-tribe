'use client';
import Modal from 'react-modal';
import { cn } from '@/lib/utils';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(242,173,239,0.3)';
Modal.defaultStyles.overlay.zIndex = '100';

const ModalWrapper = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  className,
}: Modal.Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={cn('rounded-3xl shadow-3xl p-5 m-auto mt-52', className)}
      closeTimeoutMS={100}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
