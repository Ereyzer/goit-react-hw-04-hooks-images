import React from 'react';
import PropTypes from 'prop-types';

export function Button({ loadMore, text }) {
  return (
    <button id="toScrol" className="Button" onClick={loadMore}>
      {text}
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
