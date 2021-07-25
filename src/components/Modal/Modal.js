import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

//! тут пропи не пишу бо вже вони є на GileryItem

const modalRoot = document.querySelector('#root-portal');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { image, tags } = this.props.modal;
    const backdropClick = this.handleBackdropClick;

    return createPortal(
      <div className="Overlay" onClick={backdropClick}>
        <div className="Modal">
          <img src={image} alt={tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTapes = {
  closeModal: PropTypes.func.isRequired,
};
