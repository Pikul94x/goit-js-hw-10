import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputBox = document.querySelector('#search-box');
const countryListGallery = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  if (inputBox.value === '') {
    clearInputs();
    Notiflix.Notify.info('Please fill out the form');
  }

  fetchCountries(inputBox.value.trim())
    .then(res => renderCountries(res))
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountries(countries) {
  if (countries.length > 10) {
    clearInputs();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    clearInputs();
    const markup = countries
      .map(({ flags, name }) => {
        return `<h2 class="galleryList__header"><img class="galleryList__img" src="${flags.svg}"/>${name.common}</h2>`;
      })
      .join('');

    countryListGallery.innerHTML = markup;
  } else if (countries.length === 1) {
    clearInputs();
    const markup = countries
      .map(({ flags, name, capital, population, languages }) => {
        return `<div>
        <h2 class="countryInfo__header"><img class="countryInfo__img" src="${
          flags.svg
        }"/>${name.common}</h2>
        <p class="countryInfo__item"><b>Capital: </b>${capital}</p>
        <p class="countryInfo__item"><b>Population: </b>${population}</p>
        <p class="countryInfo__item"><b>Languages: </b>${Object.values(
          languages
        )}</p>
        </div>`;
      })
      .join('');

    countryInfo.innerHTML = markup;
  }
}

function clearInputs() {
  countryListGallery.innerHTML = '';
  countryInfo.innerHTML = '';
}
