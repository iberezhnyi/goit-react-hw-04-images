import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalShow: false,
  };

  toggleModal = () => {
    this.setState(({ isModalShow }) => ({ isModalShow: !isModalShow }));
  };

  render() {
    const {
      image: { webformatURL, tags, largeImageURL },
    } = this.props;

    const { isModalShow } = this.state;

    return (
      <>
        <li className={css['gallery-item']} onClick={this.toggleModal}>
          <img src={webformatURL} alt={tags} />
        </li>
        {isModalShow && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
