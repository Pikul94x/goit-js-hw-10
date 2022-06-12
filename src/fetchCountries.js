const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('fetchCountries response error', response.status);
    }
    console.log('fetchCountries response', response);
    return response.json();
  });
};

export { fetchCountries };
