import { fetchImages } from "../../pages_api";
import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const expectedPageSize = 12;

  const handleSearch = async (newTopic) => {
    setImages([]);
    setPage(1);
    setTopic(newTopic);
    setHasMoreImages(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (imageUrl) => {
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
