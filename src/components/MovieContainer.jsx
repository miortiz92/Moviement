import React from 'react';
import '@babel/polyfill';//para trabajar con async await
import '../assets/styles/components/MovieContainer.scss';
import WatchList from './WatchList';
import VideoSection from './VideoSection';

const Li = ({ source, liClassName, divClassName, hide, title, overview, popularity, onClick, message, id }) => (
  <li className={liClassName} onClick={onClick} title={message} id={id}>
    <img src={source} alt='white' />
    <div hidden={hide} className={divClassName}>
      <h5><strong>{title}</strong></h5>
      <p>
        Overview:
        <em>
          {overview}
        </em>
      </p>
      <p>
        Punctuation:
        <em>
          {popularity}
        </em>
      </p>
    </div>
  </li>
);

class MovieContainer extends React.Component {
  state={
    movieAdd:{
      id: [],
      title: [],
    }
  }

  handleMovieOnClick = (e) => {
    let regex = new RegExp(e.currentTarget.id);
    if (!regex.test(this.state.movieAdd.id)) {
      if (this.state.movieAdd.title.length <= 10) {
        this.setState({
          movieAdd: {
            id: [
              ...this.state.movieAdd.id,
              e.currentTarget.id,
            ],
            title: [
              ...this.state.movieAdd.title,
              e.currentTarget.lastChild.firstChild.firstChild.innerHTML,
            ],
          },
        });
      }
    }
  };

  handleDeleteItem = (e) => {
    this.setState({
      movieAdd: {
        id: this.state.movieAdd.id.filter((value) => value !== e.target.id),
        title: this.state.movieAdd.title.filter((value) => value !== e.target.title),
      },
    });
  }

  render() {
    return (
      <div>
        <div className='container'>
          <section className='C block-sizes'>
            <ul id='movies' className={this.props.className}>
              {this.props.data.map((item, index) => {
                return (<Li source={item.source} liClassName={item.liClassName} divClassName={item.divClassName} hide={item.hide} title={item.title} overview={item.overview} popularity={item.popularity} onClick={this.handleMovieOnClick} message={item.message} id={item.id} />);
              })}
            </ul>
          </section>
          <WatchList
            data={this.state.movieAdd}
            onClick={this.handleDeleteItem}
          />
        </div>
        <section>
          <VideoSection //esta seccion va en app cuando se implemente bases de datos
            data={this.state.movieAdd}
          />
        </section>
      </div>
    );
  }
};

export default MovieContainer;
