import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import getAllImages from 'api/images';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setIsLoading(true);

        setError('');

        const response = await getAllImages(query, page);

        setImages(prev => [...prev, ...response.hits]);

        setLoadMoreBtn(page < Math.ceil(response.totalHits / 12));
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '' || page !== 1) getImages();
  }, [query, page]);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />

      {error && <h1>{error}</h1>}

      <ImageGallery images={images} />

      {isLoading && <Loader />}

      {!isLoading && loadMoreBtn && images?.length !== 0 && (
        <Button onLoadMore={onLoadMore} />
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
