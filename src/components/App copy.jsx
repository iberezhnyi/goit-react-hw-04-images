import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import getAllImages from 'api/images';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    images: [],
    query: null,
    page: 1,
    isLoading: false,
    error: '',
    loadMoreBtn: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    )
      this.getImages();
  }

  onSubmit = query => this.setState({ query, page: 1, images: [] });

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getImages = async () => {
    try {
      this.setState({ isLoading: true, error: '' });

      const query = this.state.query;
      const page = this.state.page;

      const response = await getAllImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        loadMoreBtn: this.state.page < Math.ceil(response.totalHits / 12),
      }));
    } catch (error) {
      console.log(error);

      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { loadMoreBtn, images, isLoading, error } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />

        {error && <h1>{error}</h1>}

        <ImageGallery images={images} />

        {isLoading && <Loader />}

        {!isLoading && loadMoreBtn && images?.length !== 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        <ToastContainer />
      </div>
    );
  }
}

export default App;
