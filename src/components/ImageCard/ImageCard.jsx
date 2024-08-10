import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <img src={src} alt={alt} onClick={onClick} className={css.imageCard} />
  );
}
