import axios from 'axios';

// export default class ApiService {
//   BASE_KEY = '21932994-b9f805e2b70fd6b5c6454ae40';
//   BASE_URL = 'https://pixabay.com/api/';
//   PAGE_COUNTER = 0;
//   Q = '';
//   async fetchImages(q) {
//     if (this.Q !== q) {
//       this.Q = q;
//       this.PAGE_COUNTER = 0;
//     }
//     this.PAGE_COUNTER = this.PAGE_COUNTER + 1;
//     const response = await fetch(
//       `${this.BASE_URL}?key=${this.BASE_KEY}&q=${q}&page=${this.PAGE_COUNTER}&image_type=photo&orientation=horizontal&per_page=12`,
//     );
//     return await response.json();
//   }
// }

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '21932994-b9f805e2b70fd6b5c6454ae40';

const fetchApi = ({ searchQuery, currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=${perPage}&key=${apiKey}&page=${currentPage}`,
    )
    .then(res => res.data.hits);
};

export default fetchApi;

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const apiKey = '16085264-71307d3f0a6fd2ec26a379ecb';

// const fetchImg = ({ searchQuery, currentPage = 1, perPage = 12 }) => {
//     return axios
//         .get(
//             `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=${perPage}&key=${apiKey}&page=${currentPage}`,
//         )
//         .then(res => res.data.hits);
// };

// export default { fetchImg };
