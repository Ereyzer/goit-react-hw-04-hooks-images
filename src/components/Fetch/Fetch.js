export default class ApiService {
  BASE_KEY = '21932994-b9f805e2b70fd6b5c6454ae40';
  BASE_URL = 'https://pixabay.com/api/';
  PAGE_COUNTER = 0;
  Q = '';
  async fetchImages(q) {
    if (this.Q !== q) {
      this.Q = q;
      this.PAGE_COUNTER = 0;
    }
    this.PAGE_COUNTER = this.PAGE_COUNTER + 1;
    const response = await fetch(
      `${this.BASE_URL}?key=${this.BASE_KEY}&q=${q}&page=${this.PAGE_COUNTER}&image_type=photo&orientation=horizontal&per_page=12`,
    );
    return await response.json();
  }
}
