const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34913875-a3fb3e83b61c48d3709723712';

export const getSearchImg = (images, page, perPage) => {
  return fetch(
    `${BASE_URL}?q=${images}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
};

// export const getSearchImg = (images, page, perPage) => {
// return fetch(
// `${BASE_URL}?q=${images}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
// ).then(res => {
// if (res.ok) {
// return Response.json();
// }
// return Promise.reject(
// new Error(`Couldn't find anything with name ${images}`)
// );
// });
// };

// .then(res => res.json());
