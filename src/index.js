import Notiflix from 'notiflix';
import ImagesApiService from './js/api-service';

const refs = {
  input: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();
refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onClick);

function onSearch(evt) {
  evt.preventDefault();

  clearGallery();
  imagesApiService.query = refs.input.value;

  if (imagesApiService.query === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(createGalleryMarkup);
  refs.loadMoreBtn.hidden = false;
  //   if ( === 0) {
  //     return Notiflix.Notify.failure(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   }
}

function onClick() {
  imagesApiService.incrementPage();
  imagesApiService.fetchImages().then(createGalleryMarkup);

  //   if (promise.data.hits.length > ) {
  //     return alert('The end');
  //   }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function createGalleryMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
        <a href='${largeImageURL}'>
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width= '400' height='300'/>
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
