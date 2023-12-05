import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const selector = document.querySelector('.breed-select');
const divCatDescription = document.querySelector('.cat-description');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('is-hidden', 'loader');
error.classList.add('is-hidden');
divCatDescription.classList.add('is-hidden');
selector.classList.add('is-hidden');
updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
selector.classList.remove('is-hidden'); 
      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      selector.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: selector,
      });
    })
    .catch(onFetchError);
}

selector.addEventListener('change', onSelectBreed);

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatDescription.classList.add('is-hidden');

  const breedId = event.target.value;


    fetchCatByBreed(breedId)
      .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];

        divCatDescription.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="500px"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
        divCatDescription.classList.remove('is-hidden');
      })
      .catch(onFetchError);
  }
