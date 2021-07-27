import React from 'react';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ smallImg, largeImg, alt, openModal }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={smallImg}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={() => openModal(largeImg, alt)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
