import { Modal } from 'components/Modal/Modal';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags },
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={css.galleryItem}>
      <img
        className={css.itemImage}
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={closeModal}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
