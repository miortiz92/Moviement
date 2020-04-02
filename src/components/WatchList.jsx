import React from 'react';
import drop from '../assets/static/borrar.png';
import '../assets/styles/components/WatchList.scss';

const Li = ({ title, id, onclick }) => (
  <div className='watchList__cell'>
    <li>{title}</li>
    <img src={drop} alt='delete' id={id} title={title} onClick={onclick} />
  </div>
);

class WatchList extends React.Component {

  state={
    title: '',
  }

  render() {
    return (
      <section className='watchList'>
        <strong>See later</strong>
        <ul className='watchList__list'>
          {this.props.data.title.map((item, index) => (<Li title={item} id={this.props.data.id[index]} onclick={this.props.onClick} />))}
        </ul>
      </section>
    );
  }
}

export default WatchList;
