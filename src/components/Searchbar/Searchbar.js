import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = { value: '' };

  handleChange = e => {
    (() => this.setState({ value: e.target.value }))();
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      props: { onSubmit },
      state: { value },
    } = this;

    onSubmit(value);
  };

  render() {
    const {
      state: { value },
      handleChange,
      handleSubmit,
    } = this;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
