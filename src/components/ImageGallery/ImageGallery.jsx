import { Component } from 'react';
import { getSearchImg } from '../Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = { hits: [] };

  componentDidUpdate(prevProps, prevState) {
    const images = this.props.searchImg.trim();
    if (prevProps.searchImg !== images && images) {
      console.log(this.props.searchImg);
      getSearchImg(images).then(({ hits }) => {
        this.setState({ hits });
      });
    }
  }

  render() {
    const { hits } = this.state;
    return (
      hits.length > 0 && (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem hits={hits} />
        </ul>
      )
    );
  }
}
export default ImageGallery;
