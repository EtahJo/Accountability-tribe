'use client';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // This is necessary for accessibility

const ModalWrapper = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}: Modal.Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="your-custom-class"
      overlayClassName="your-overlay-class"
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
