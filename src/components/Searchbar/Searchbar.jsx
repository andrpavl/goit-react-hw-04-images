import { useState } from 'react';
import { MdOutlineImageSearch } from 'react-icons/md';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = evt => {
    setSearchValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchValue.trim() === '') {
      Notiflix.Notify.warning('Ooops! You need to enter something');
      return;
    }
    onSubmit(searchValue);
    setSearchValue(searchValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchBtn}>
          <MdOutlineImageSearch className={css.buttonLabel} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchValue}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
