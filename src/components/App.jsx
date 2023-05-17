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
  };

  componentDidUpdate(prevProps, prevState) {
    const images = this.state.searchImg.trim();
    const { page, perPage, hits } = this.state;
    if (prevState.searchImg !== images || prevState.page !== page) {
      this.setState({ isLoading: true, hits: null });
      getSearchImg(images, page, perPage)
        .then(data => {
          // this.setState(prevState => ({
          //   hits: null ? data.hits : [...prevState.hits, ...data.hits],
          // }));
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
    const { hits, isLoading, isShowModal, modal } = this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && <Loader />}

        {hits !== null && <ImageGallery hits={hits} onData={this.savedModal} />}
        {hits?.length > 0 && (
          <Button handleClick={this.handleAdd} title="Load more" />
        )}
        {hits?.length === 0 && (
          <div style={{ fontSize: '24px', fontWeight: '600' }}>No results!</div>
        )}
        {isShowModal && <Modal onClose={this.closeModal} modal={modal} />}
      </div>
    );
  }
}

export default App;
