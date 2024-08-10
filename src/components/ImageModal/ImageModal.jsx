import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({ isOpen, onRequestClose, imageUrl }) {
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
        <img src={imageUrl} alt="Large format" className={css.largeImage} />
      </div>
    </Modal>
  );
}
