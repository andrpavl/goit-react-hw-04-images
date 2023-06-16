import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPics } from '../service/fetch';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import Notiflix from 'notiflix';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [areMore, setAreMore] = useState(true);

  const handleSearch = searchValue => {
    setImages([]);
    setPage(1);
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const abortCtrl = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await fetchPics(searchValue, page, abortCtrl.signal);
        if (data.hits) {
          setImages(prevState => [...prevState, ...data.hits]);
          setAreMore(data.hits.length >= 12);
        } else {
          setImages([]);
          setError('Can not find anything');
          setAreMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => abortCtrl.abort();
  }, [page, searchValue]);

  const loadMorePics = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} />
      {loading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}
      {error && Notiflix.Notify.failure(error)}
      {!loading && !error && images.length >= 12 && areMore && (
        <Button onClick={loadMorePics} />
      )}
    </div>
  );
}
