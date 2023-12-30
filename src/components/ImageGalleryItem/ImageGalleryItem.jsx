import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image: { webformatURL, tags, largeImageURL } }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const toggleModal = () => {
    setIsModalShow(prev => !prev);
  };

  return (
    <>
      <li className={css['gallery-item']} onClick={toggleModal}>
        <img src={webformatURL} alt={tags} />
      </li>
      {isModalShow && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
