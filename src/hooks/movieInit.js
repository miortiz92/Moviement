import '../assets/styles/components/MovieContainer.scss';
import fig1 from '../assets/static/1.jpg';
import fig2 from '../assets/static/2.jpg';
import fig3 from '../assets/static/3.jpg';
import fig4 from '../assets/static/4.jpg';
import fig5 from '../assets/static/5.jpg';
import fig6 from '../assets/static/6.jpg';
import fig7 from '../assets/static/7.jpg';
import fig8 from '../assets/static/8.jpg';
import fig9 from '../assets/static/9.jpg';
import fig10 from '../assets/static/10.jpg';
import fig11 from '../assets/static/11.jpg';
import fig12 from '../assets/static/12.jpg';
import fig13 from '../assets/static/13.jpg';
import fig14 from '../assets/static/14.jpg';
import fig15 from '../assets/static/15.jpg';
import fig16 from '../assets/static/16.jpg';
import fig17 from '../assets/static/17.jpg';
import fig18 from '../assets/static/18.jpg';
import fig19 from '../assets/static/19.jpg';
import fig20 from '../assets/static/20.jpg';
import fig21 from '../assets/static/21.jpg';
import fig22 from '../assets/static/22.jpg';
import fig23 from '../assets/static/23.jpg';
import fig24 from '../assets/static/24.jpg';

function movieInit() {
  const liClassName = 'movies__item';
  const divClassName = '';
  const title = '';
  const overview = '';
  const popularity = '';
  const hide = true;
  let newObjectArray = [];
  const src = [fig1, fig2, fig3, fig4, fig5, fig6, fig7, fig8, fig9, fig10, fig11, fig12, fig13, fig14, fig15, fig16, fig17, fig18, fig19, fig20, fig21, fig22, fig23, fig24];

  src.map((item) => {
    newObjectArray.push({
      source: item,
      liClassName,
      divClassName,
      title,
      overview,
      popularity,
      hide,
    });
  });
  return newObjectArray;
}

export default movieInit;
