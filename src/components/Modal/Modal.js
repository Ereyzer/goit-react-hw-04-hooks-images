import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

//! тут пропи не пишу бо вже вони є на GileryItem

const modalRoot = document.querySelector('#root-portal');
export function Modal({ modal: { image, tags }, closeModal }) {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={image} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTapes = {
  closeModal: PropTypes.func.isRequired,
};
