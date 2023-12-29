import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') this.props.toggleModal();
  };

  handleBackdrop = evt => {
    if (evt.currentTarget === evt.target) this.props.toggleModal();
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.handleBackdrop}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.any,
};
