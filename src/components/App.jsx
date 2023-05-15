import { Component } from 'react';
import { getSearchImg } from './api/SearchFile';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import css from './App.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = { searchImg: '', hits: null, isLoading: false, page: 1, perPage: 12 };

  componentDidUpdate(prevProps, prevState) {
    const images = this.state.searchImg.trim();
    const { page, hits, perPage } = this.state;
    if ((prevState.searchImg !== images && images) || prevState.page !== page) {
      this.setState({ isLoading: true, hits: null });
      getSearchImg(images, page, perPage)
        .then(data => {
          // const lastPage = data.total / perPage;
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

  render() {
    const { hits, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && <Loader />}

        {hits?.length > 0 && (
          <>
            <ImageGallery hits={hits} /> <Button handleClick={this.handleAdd} />
          </>
        )}
        {hits?.length === 0 && <div>No results!</div>}
      </div>
    );
  }
}

export default App;
