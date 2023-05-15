import { Component } from 'react';
import { getSearchImg } from './api/SearchFile';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    searchImg: '',
    hits: null,
    isLoading: false,
    page: 1,
    perPage: 12,
    isShowModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const images = this.state.searchImg.trim();
    const { page, hits, perPage } = this.state;
    if ((prevState.searchImg !== images && images) || prevState.page !== page) {
      this.setState({ isLoading: true, hits: null });
      getSearchImg(images, page, perPage)
        .then(data => {
          console.log(data.hits);
          console.log(data.total);

          if (data.hits) return this.setState({ hits: data.hits });
          else if (data.hits && hits !== null)
            return this.setState({ hits: [...data.hits, ...prevState.hits] });
          return Promise.reject(data.message);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  openModal = () => {
    this.setState({ isShowModal: true });
  };
  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  handleSearch = searchImg => {
    this.setState({ searchImg });
  };
  handleAdd = () => {
    this.setState(prevState => {
      console.log(prevState);
      return {
        page: prevState.page + 1,
      };
    });
  };
  savedModal = data => {
    // console.log(data);
    this.setState({ ...data });
  };

  render() {
    const { hits, isLoading, isShowModal, modal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && <Loader />}

        {hits?.length > 0 && (
          <>
            <ImageGallery
              hits={hits}
              onData={this.savedModal}
              open={this.openModal}
            />
            <Button handleClick={this.handleAdd} />
          </>
        )}
        {hits?.length === 0 && <div>No results!</div>}
        {isShowModal && <Modal onClose={this.closeModal} modal={modal} />}
      </div>
    );
  }
}

export default App;
