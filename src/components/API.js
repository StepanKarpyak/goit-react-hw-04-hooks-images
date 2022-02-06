import axios from 'axios';

const KEY = '25498735-235a4a9b09becec7a8b624594';
const BASE_URL = 'https://pixabay.com/api';
const perPage = 12;

export async function fetchImg(value, currentPage) {
  return await axios.get(
    `${BASE_URL}/?q=${value}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}
`,
  );
}
