import { Component } from 'react';
import { getSearchImg } from './api/SearchFile';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    searchImg: '',
    hits: null,
    isLoading: false,
    isShowModal: false,
    page: 1,
    perPage: 12,
    modal: { url: '', tags: '' },
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchImg;
    const prevPage = prevState.page;
    const { page, perPage, hits, searchImg } = this.state;

    if (prevName !== searchImg || prevPage !== page) {
      this.setState({ isLoading: true, hits: null });
      getSearchImg(searchImg, page, perPage)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Did not find'));
        })
        .then(data => {
          if (hits === null) return this.setState({ hits: data.hits });
          return this.setState({ hits: [...prevState.hits, ...data.hits] });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  handleSearch = searchImg => {
    this.setState({ searchImg });
  };

  handleAdd = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  savedModal = (tags, url) => {
    this.setState({ modal: { tags, url }, isShowModal: true });
  };

  render() {
    const { hits, isLoading, isShowModal, modal, error, searchImg } =
      this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        {error && <h1>{error.message}</h1>}
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && <Loader />}

        {hits !== null && <ImageGallery hits={hits} onData={this.savedModal} />}
        {hits?.length > 0 && (
          <Button handleClick={this.handleAdd} title="Load more" />
        )}
        {hits?.length === 0 && (
          <div style={{ fontSize: '24px', fontWeight: '600' }}>
            No results {searchImg}!
          </div>
        )}
        {isShowModal && <Modal onClose={this.closeModal} modal={modal} />}
      </div>
    );
  }
}

export default App;
