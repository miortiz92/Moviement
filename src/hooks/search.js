import '../assets/styles/components/MovieContainer.scss';
import '@babel/polyfill';//para trabajar con async await

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '60eeefc5acebe9793693f93d322a75ea';

async function search(movieLastState, { year, genre }) {
  let newObjectArr = [];

  const querys = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      return data.results;
    }
    return data;
  };

  const getMovie = async (id) => {
    const url = `${URL}movie/${id}?api_key=${API_KEY}`;
    return querys(url);
  };

  const getIds = (data, n = 6) => {
    const ids = data.slice(0, n).map((movie) => movie.id);
    return ids;//.reverse()
  };

  const topMovieGender = async () => {
    try {
      const url = `${URL}discover/movie?with_genres=${genre}&primary_release_year=${year}&sort_by=popularity.desc&api_key=${API_KEY}`
      return getIds(await querys(url));
    } catch (error) {
      console.log(console.error('Error'));
    }
  };

  const loadOptions = async () => {
    const containers = [5, 6, 7, 10, 15, 17]; // child
    let cont = 0;
    const ids = await topMovieGender();
    const listPromises = ids.map((id) => getMovie(id));
    const movies = await Promise.all(listPromises);
    movieLastState.map(async (data, index) => {
      if (containers.includes(index)) {
        newObjectArr.push({
          source: `https://image.tmdb.org/t/p/w342${movies[cont].poster_path}`,
          liClassName: 'movies__img movies__item',
          divClassName: 'movies__details',
          title: movies[cont].title,
          overview: movies[cont].overview,
          popularity: movies[cont].popularity,
          hide: false,
          message: 'add to watch list?',
          id: movies[cont].id,
        });
        cont += 1;
      };
      if (!containers.includes(index)) {
        newObjectArr.push({
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

  await loadOptions();
  return newObjectArr;
};

export default search;
