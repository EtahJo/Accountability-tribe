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
        'flex justify-center items-center place-content-center w-full h-full mx-auto ',
        className
      )}
      closeTimeoutMS={100}
    >
      <div className="h-[700px] overflow-y-scroll overflow-x-hidden">
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
