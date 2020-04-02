import React from 'react';
import '../assets/styles/components/Header.scss';

class Header extends React.Component {

  render() {
    return (
      <header>
        <div>
          <input onChange={this.props.onChange} type='text' id='manualSearchInput' placeholder='Search the movie...' name='movieSearch' title='headerValues' value={this.props.headerValues.movieSearch} />
          <button onClick={this.props.onClick} id='manualSearchButton' type='submit'>Search</button>
        </div>
      </header>
    );
  };

};

export default Header;
