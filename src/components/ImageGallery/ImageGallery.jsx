import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

import React from 'react';

const ImageGallery = ({ hits }) => {
  return (
    <ul className={css.ImageGallery}>
      {hits.map(({ id, webformatURL, tags }) => (
        <li className={css.ImageGalleryItem} key={id}>
          <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

// class ImageGallery extends Component {
//   state = { hits: null, isLoading: false, page: 1 };

//   componentDidUpdate(prevProps, prevState) {
//     console.log(this.props);
//     const images = this.props.searchImg.trim();
//     const { page } = this.state;
//     if (
//       (prevProps.searchImg !== images && images) ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true, hits: null });
//       getSearchImg(images, page)
//         .then(data => {
//           console.log(data);
//           if (data.hits) return this.setState({ hits: data.hits });
//           return Promise.reject(data.message);
//         })
//         .catch(error => {
//           console.log(error);
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   render() {
//     const { hits, isLoading } = this.state;
//     return (
//       <>
//         {isLoading && <Bars />}
//         {hits?.length > 0 && (
//           <ul className={css.ImageGallery}>
//             {hits.map(({ id, webformatURL, tags }) => (
//               <li className={css.ImageGalleryItem} key={id}>
//                 <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
//               </li>
//             ))}
//           </ul>
//         )
//         <Button />
//         }
//         {hits?.length === 0 && <div>No results!</div>}
//       </>
//     );
//   }
// }
// export default ImageGallery;
