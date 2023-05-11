import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits }) => {
  return (
    <>
      {hits.map(({ id, webformatURL, tags }) => (
        <li className={css.ImageGalleryItem} key={id}>
          <img src={webformatURL} alt={tags} />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
