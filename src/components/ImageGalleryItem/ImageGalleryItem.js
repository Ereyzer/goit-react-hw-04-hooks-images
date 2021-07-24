import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    smallImg: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  handleClick(image, alt) {
    this.props.openModal(image, alt);
  }

  render() {
    const { smallImg, largeImg, alt } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          src={smallImg}
          alt={alt}
          className="ImageGalleryItem-image"
          onClick={() => this.handleClick(largeImg, alt)}
        />
      </li>
    );
  }
}
