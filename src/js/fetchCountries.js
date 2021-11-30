const BASE_URL = 'https://restcountries.com/v2';
const queryParams = 'fields=name,capital,population,flags,languages';

function fetchCountryByName(name) {
  return fetch(`${BASE_URL}/name/${name}?${queryParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountryByName };