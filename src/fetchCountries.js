export function fetchCountries(valueText) {
  console.log(valueText, 'name');
  return fetch(
    `https://restcountries.com/v3.1/name/${valueText}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
