import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <>
      <img src={webformatURL} alt={tags} className={css.ImageGalleryItemImg} />
    </>
  );
};

export default ImageGalleryItem;
