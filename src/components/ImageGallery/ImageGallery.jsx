import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => onImageClick(image.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
}
