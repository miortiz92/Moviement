import React from 'react';
import '../assets/styles/components/VideoSection.scss';

const URL = 'http://api.themoviedb.org/3/movie/';
const API_KEY = '60eeefc5acebe9793693f93d322a75ea';

const Iframe = ({ title }) => (
  <div className='carousel__item'>
    <iframe className='carousel__item-video' src={title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    {/* <div id={id} className='carousel__item-video' /> */}
  </div>
);

let ids = [];

class VideoSection extends React.Component {
  state={
    key: [],
  }

  handlePromise = async () => {
    this.props.data.id.map(async (item) => {
      const url = `${URL}${item}/videos?api_key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const videoKey = data.results[0].key;
      this.setState({
        key: [
          ...this.state.key,
          `https://www.youtube.com/embed/${videoKey}`,
        ],
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.id != this.props.data.id) {
      this.setState({
        key: [],
      });
      ids = [];
      this.handlePromise();
    }
  };

  render() {
    return (
      <section className='carousel__container'>
        {this.state.key.map((item, index) => {
          // let id = 'video' + index;
          // ids.push(id);
          return (<Iframe title={item} />);
        })}
      </section>
    );
  }
};

export default VideoSection;
