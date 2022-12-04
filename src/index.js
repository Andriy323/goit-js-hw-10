import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

let items = [];

refs.input.addEventListener('input', debounce(creatFunction, DEBOUNCE_DELAY));

// const URL = ' https://restcountries.com/v3.1';
function creatFunction(e) {
 let valueText = e.target.value.trim();
  refs.list.innerHTML = '';

  if (!valueText) {
    refs.list.innerHTML = '';

    return;
  }

  fetchCountries(valueText)
    .then(data => {
      console.log(data, 'data');
      items = data;
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      newRenderList(data);
    })
    .catch(err => {
      refs.list.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
      return;
    });
}

const creatItems = ({ name, capital, population, languages, flags }) =>
  `<li class="country-item">
<h1 class="country-title">
  <img src="${flags.png}" alt="${name.official}" width="70">
  ${name.official}
</h1>
<p class="pretitle-cantry"><b>Capital:</b> ${capital}</p>
<p class="pretitle-cantry"><b>Languages:</b> ${Object.values(languages).join(
    ', '
  )}</p>
<p class="pretitle-cantry"><b>Population:</b> ${population}</p>

</li>`;

// console.log(valueText, "value")
const renderItems = () => {
  const lists = items.map(creatItems);
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', lists.join(''));
};

// fetch(`${URLTEST}/${valueText}?fields=${fields}`)
// .then(resp =>console.log(resp.ok, "ok"))

// console.log(valueText);
const creatItemsFlag = ({ flags, name }) =>
  `<li class = "country-item"><img src="${flags.png}" alt="${name.official}" width="40" >  ${name.official}</li>`;

const renderItemsFlag = () => {
  const lists = items.map(creatItemsFlag);
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', lists.join(''));
};

const newRenderList = data => {
  if (data.length === 1) {
    renderItems();
  }
  if (data.length > 1 && data.length < 10) {
    renderItemsFlag();
  }
  console.log(data.length);
};
