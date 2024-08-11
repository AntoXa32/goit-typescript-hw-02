import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string | null;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  imageUrl,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.imageModal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={css.modalContent}>
        {imageUrl && (
          <img src={imageUrl} alt="Large format" className={css.largeImage} />
        )}
      </div>
    </Modal>
  );
}
