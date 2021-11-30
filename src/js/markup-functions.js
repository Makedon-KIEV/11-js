import getRefs from './getRefs';

const refs = getRefs();

function getCountries(data) {
  const countriesList = data
    .map(({ flags, name }) => {
      return `<li class="list__item">
                <p class="item__container"><img class="list__img" width='60' height='40' src='${flags.svg}'/></p>
                <p class="list__text">${name}</p>
          </li>`;
    })
    .join('');
  refs.countriesListRef.innerHTML = countriesList;
}

function getCountryByName(data) {
  const countryInfo = data
    .map(({ flags, name, languages, population, capital }) => {
      return `<div class="country__container">
              <p class="img__container">
                <img class="country__img" width='280' height='186' src='${flags.svg}'/>
              </p>
          <p class="country__name">${name}</p>
          <p class="country__property">Capital: <span class="property__value">${capital}</span></p>
          <p class="country__property">Population: <span class="property__value">${population}</span></p>
          <p class="country__property">Languages: <span class="property__value">${languages
            .map(el => el.name)
            .join(', ')}</span></p>
          </div>`;
    })
    .join('');
  refs.countryInfoRef.innerHTML = countryInfo;
}

function deleteCountry() {
  refs.countryInfoRef.innerHTML = '';
}

function deleteCountries() {
  refs.countriesListRef.innerHTML = '';
}

export default { getCountries, getCountryByName, deleteCountries, deleteCountry };