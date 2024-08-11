import { fetchImages } from "../../pages_api";
import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../../types";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const expectedPageSize = 12;

  const handleSearch = async (newTopic: string) => {
    setImages([]);
    setPage(1);
    setTopic(newTopic);
    setHasMoreImages(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const images = await fetchImages(topic, page);
        setImages((prevImages) => {
          return [...prevImages, ...images];
        });
        if (images.length === 0 || images.length < expectedPageSize) {
          setHasMoreImages(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [page, topic]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}

      {!loading && hasMoreImages && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {!loading && !hasMoreImages && images.length > 0 && (
        <p className="noMoreImages">No more pictures in the gallery!!!</p>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        imageUrl={selectedImage}
      />
    </>
  );
}
