'use client';
import Modal from 'react-modal';
import { cn } from '@/lib/utils';

if (Modal.defaultStyles.overlay) {
  // eslint-disable-next-line
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(242,173,239,0.3)';
  // eslint-disable-next-line
  Modal.defaultStyles.overlay.zIndex = '100';
}

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
      className={cn(
        ' m-auto flex justify-center items-center mt-24 flex-col',
        className
      )}
      closeTimeoutMS={100}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
