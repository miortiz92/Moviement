import React from 'react';
import '../assets/styles/components/Searcher.scss';
import '@babel/polyfill';//para trabajar con async await

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '60eeefc5acebe9793693f93d322a75ea';

const Option = ({ genderName, genderId }) => (
  <option value={genderName} id={genderId}>{genderName}</option>
);

class Searcher extends React.Component {
  state = {
    genresData: [{
      name:'',
      id:'',
    }]
  };

  fetchGenres = async () => {
    const response = await fetch(`${URL}genre/movie/list?api_key=${API_KEY}`);
    const { genres } = await response.json();
    this.setState({
      genresData: genres,
    });
  };

  componentDidMount() {
    this.fetchGenres();
  };

  render() {
    return (
      <section onSubmit={this.handleOnSubmit} className='searcher'>
        <h1><strong> Looking for movies?</strong></h1>
        <div>
          <select onChange={this.props.onSelect} name='genre' id='selector' title='searchValues'>
            <option id='selector_options'> Select Genre ... </option>
            {this.state.genresData.map((item) => {
              return (<Option genderName={item.name} genderId={item.id} />);
            })}
          </select>
          <input type='number' min='1980' max={this.props.searchValues.max} onChange={this.props.onChange} value={this.props.searchValues.year} id='year' placeholder='Type year' name='year' title='searchValues' />
          <button id='selectSearchButton' type='submit' onClick={this.props.onClick} disabled={this.props.searchValues.status}>Search</button>
        </div>
        <p id='message' />
      </section>
    );
  }

};

export default Searcher;
