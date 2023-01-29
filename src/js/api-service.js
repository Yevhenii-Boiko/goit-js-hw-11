import axios from 'axios';
export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.quantity = 40;
  }

  async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '33163433-7381312326b7cb4a7310bb1a7';
    const filter = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.quantity}&page=${this.page}`;
    return await axios.get(`${BASE_URL}${filter}`).then(promise => {
      console.log(promise.data.totalHits);
      console.log(promise.data);
      console.log(promise.data.hits);
      return promise.data.hits;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
