import React from 'react';
import PropTypes from 'prop-types';
//! тут пропи не пишу бо вже вони є на GileryItem

export function Modal({ modal: { image, tags }, closeModal }) {
  window.addEventListener('keydown', closeModal);
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={image} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTapes = {
  closeModal: PropTypes.func.isRequired,
};
