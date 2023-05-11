const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34913875-a3fb3e83b61c48d3709723712';

export const getSearchImg = images => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
};
