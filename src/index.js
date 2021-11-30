import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './js/fetchCountries';
import getRefs from './js/getRefs';
import MarkupService from './js/markup-functions';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputSearchRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const query = e.target.value.trim();

  if (!query) {
    MarkupService.deleteCountry();
    MarkupService.deleteCountries();
    return;
  }
  e.target.value = query;
  API.fetchCountryByName(query).then(renderMarkup).catch(onFetchError);
}

function renderMarkup(countries) {
  if (countries.length >= 10) {
    MarkupService.deleteCountry();
    MarkupService.deleteCountries();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length >= 2 && countries.length < 10) {
    MarkupService.deleteCountry();
    MarkupService.getCountries(countries);
    return;
  }

  MarkupService.deleteCountries();
  MarkupService.getCountryByName(countries);
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
  MarkupService.deleteCountry();
  MarkupService.deleteCountries();
}