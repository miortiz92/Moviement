import React from 'react';
import Header from '../components/Header2';
import Searcher from '../components/Searcher2';
import MovieContainer from '../components/MovieContainer';
import '../assets/styles/App.scss';
import '../assets/styles/components/MovieContainer.scss';
import movieInit from '../hooks/movieInit';
import search from '../hooks/search';
import header from '../hooks/header';
import Modal from '../components/Modal';
// import VideoSection from '../components/VideoSection';
import '@babel/polyfill';//para trabajar con async await

const date = new Date();
let stat;

class App extends React.Component {
  state = { 
    headerValues: { 
      movieSearch: '',
    },
    searchValues: {
      year: '',
      genre: '',
      max: date.getFullYear(),
      status: false,
    },
    suggestBox: {
      show:false,
    },
    className: '',
    moviesState: movieInit(),
    moviesPreState: movieInit(),
    movieAdd: '',
  };

  handleHeaderChange = (e) => {
    this.setState({
      headerValues: {
        ...this.state.headerValues,
        [e.target.name]: e.target.value,
      },
      searchValues: {
        ...this.state.searchValues,
      },
      moviesPreState: [
        ...this.state.moviesPreState,
      ],
      suggestBox: {
        show:false,
      },
    });
  };

  handleSearchChange = (e) => {
    if (e.target.name == 'year') {
      if (e.target.value > this.state.searchValues.max) {
        stat = true;
      } else {
        stat = false;
      }
    }
    this.setState({
      headerValues: {
        ...this.state.headerValues,
      },
      searchValues: {
        ...this.state.searchValues,
        status: stat,
        [e.target.name]: e.target.value,
      },
      moviesPreState: [
        ...this.state.moviesPreState,
      ],
    });
  };

  handleSelectChange = (e) => {
    const selec = document.getElementById('selector').options;
    const index = selec.selectedIndex;
    this.setState({
      headerValues: {
        ...this.state.headerValues,
      },
      searchValues: {
        ...this.state.searchValues,
        [e.target.name]: selec[index].id,
      },
      moviesPreState: [
        ...this.state.moviesPreState,
      ],
      suggestBox: {
        show:false,
      },
    });
  };

  handleHeaderClick = async (e) => {
    const [moviesState, suggestBox, className] = await header(this.state.moviesPreState, this.state.headerValues);
    this.setState({
      headerValues: {
        ...this.state.headerValues,
      },
      searchValues: {
        ...this.state.searchValues,
      },
      moviesPreState: [
        ...this.state.moviesPreState,
      ],
      suggestBox,
      className,
      moviesState,
    });
  };

  handleSuggestBoxOnCancel = () => {
    this.setState({
      suggestBox: {
        show: false,
      },
      className: '',
      moviesState: this.state.moviesPreState,
    });
  }

  handleSuggestBoxOnConfirm = () => {
    this.setState({
      suggestBox: {
        show: false,
      },
      className: 'movie__container',
      moviesState: this.state.moviesState,
    });
  }

  handleSearchClick = async (e) => {
    this.setState({
      headerValues: {
        ...this.state.headerValues,
      },
      searchValues: {
        ...this.state.searchValues,
      },
      moviesPreState: [
        ...this.state.moviesPreState,
      ],
      suggestBox: {
        ...this.state.suggestBox,
      },
      className: 'movies__container',
      moviesState: await search(this.state.moviesPreState, this.state.searchValues),
    });
  };

  render() {
    return (
      <div className='App'>
        <Header
          onChange={this.handleHeaderChange}
          headerValues={this.state.headerValues}
          onClick={this.handleHeaderClick}
        />
        <Searcher
          onSelect={this.handleSelectChange}
          searchValues={this.state.searchValues}
          onChange={this.handleSearchChange}
          onClick={this.handleSearchClick}
        />
        <Modal
          suggest={this.state.suggestBox}
          onCancelBox={this.handleSuggestBoxOnCancel}
          onConfirmBox={this.handleSuggestBoxOnConfirm}
        />
        <MovieContainer
          data={this.state.moviesState}
          className={this.state.className}
        />
      </div>
    );
  };
};

export default App;
