import React from 'react';
import PropTypes from 'prop-types';

export function Button({ loadMore }) {
  return (
    <button className="Button" onClick={loadMore}>
      Load More
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
