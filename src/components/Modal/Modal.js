import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

//! тут пропи не пишу бо вже вони є на GileryItem

const modalRoot = document.querySelector('#root-portal');
export function Modal({ modal: { image, tags }, closeModal }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // ! не зовсім зрозуміло чому лінтер хоче щоб запхати в масив handleKeyDown а потім щоб забрати його зводт
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
