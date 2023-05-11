import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = { searchImg: '' };

  handleSearch = searchImg => {
    this.setState({ searchImg });
  };

  render() {
    const { searchImg } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchImg={searchImg} />
      </div>
    );
  }
}

export default App;
