
import '../assets/styles/components/MovieContainer.scss';
import '@babel/polyfill';//para trabajar con async await

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '60eeefc5acebe9793693f93d322a75ea';
const LANGUAJE = '&language=en-US';

async function header(movieLastState, { movieSearch }) {

  const titles = [];
  const indexes = [];
  const moviesState = [];
  let suggestBox = {};
  let valueInput;
  let regex;
  let className;
  let newSuggestion = '';

  const querys = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      return data.results;
    }
    return data;
  };

  const loadMovies = async () => {
    for (let i = 1; i < 10; i++) {
      const url = `${URL}discover/movie?sort_by=popularity.desc&page=${i}${LANGUAJE}&api_key=${API_KEY}`;
      const query = await querys(url);
      query.map((movie) => {
        indexes.push(movie.id);
        titles.push(movie.original_title.replace(/\s/g, ''));
      });
    };
  };

  const handler = { //proxi
    get(obj, prop) {
      const input = obj.find((val) => val.toLowerCase() == valueInput.toLowerCase());
      if (input) {
        return {
          value: input,
          index: obj.indexOf(input),
          state: 'input',
        };
      }
      const suggestion = obj.find((key) => {
        return regex.test(key);
      });
      if (suggestion) {
        newSuggestion = suggestion.replace(/([A-Z])/g, ' $1');
        return {
          value: newSuggestion,
          index: obj.indexOf(suggestion),
          state: 'suggested',
        };
      }
      return {
        value: `No hay sugerencias para la película "${valueInput}". Puede haber un error?`,
        index: null,
        state: 'none',
      };
    },
    set(obj, prop, value) {
      valueInput = value;
      regex = new RegExp(value, 'i');
      return true;
    },
  };

  const getMovie = async (id) => {
    const url = `${URL}movie/${id}?api_key=${API_KEY}`;
    return querys(url);
  };

  const renderMovie = async (movie, indexMovie) => {
    movieLastState.map(async (data, index) => {
      if (index === indexMovie) {
        moviesState.push({
          source: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          liClassName: 'movies__img movies__item',
          divClassName: 'movies__details',
          title: movie.title,
          overview: movie.overview,
          popularity: movie.popularity,
          hide: false,
          message: 'add to watch list?',
          id: movie.id,
        });
      };
      if (index !== indexMovie) {
        moviesState.push({
          source: data.source,
          liClassName: data.liClassName,
          divClassName: data.divClassName,
          title: data.title,
          overview: data.overview,
          popularity: data.popularity,
          hide: data.hide,
          message: '',
          id: '',
        });
      }
    });
  };

  const loadManual = async (p) => {
    p.title = movieSearch;
    const { value, index, state } = p.title;
    const data = await getMovie(indexes[index]);
    if (state === 'suggested') {
      suggestBox = {
        value: 'Are you sure?',
        show: true,
        message: `"${valueInput}" no se encontro. Quisiste decir  "${newSuggestion}" ?`,
      };
      className = 'movie__container';
      await renderMovie(data, 6);
    }
    if (state === 'none') {
      suggestBox = {
        value: 'Sorry :(',
        show: true,
        message: value,
      };
      className = '';
      await renderMovie(data, '');
    }
    if (state === 'input') {
      className = 'movie__container';
      await renderMovie(data, 6);
    }
  };

  const init = async () => {
    await loadMovies();
    const p = new Proxy(titles, handler);
    await loadManual(p);
  };

  await init();

  const output = [moviesState, suggestBox, className];
  return output;
};

export default header;
