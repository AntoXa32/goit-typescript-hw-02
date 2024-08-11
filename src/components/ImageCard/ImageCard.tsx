import css from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export default function ImageCard({ src, alt, onClick }: ImageCardProps) {
  return (
    <img src={src} alt={alt} onClick={onClick} className={css.imageCard} />
  );
}
