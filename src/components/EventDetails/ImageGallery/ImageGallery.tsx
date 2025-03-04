import React, { useState } from "react";
import "./ImageGallery.scss";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-gallery-overlay">
      <div className="image-gallery-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <div className="image-gallery-container">
          <button className="nav-button prev" onClick={handlePrev}>
            &#10094;
          </button>

          <div className="image-container">
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
            />
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <button className="nav-button next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
