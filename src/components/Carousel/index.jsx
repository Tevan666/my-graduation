import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import plant from '@/assets/plant.png';
import money from '@/assets/money.png';
const CarouselComponent = (props) => {
  const imgArr = [
    {
      name: '动物识别',
      url: 'https://api.zylearning.top/api/wallpaper?lx=dw',
    },
    {
      name: '植物识别',
      url: plant,
    },
    {
      name: '货币识别',
      url: money,
    },
  ];
  return (
    <Carousel
      autoPlay
      infiniteLoop={true}
      axis={props.type === 'animal' ? 'horizontal' : 'vertical'}
      interval={props.type === 'animal' ? 3000 : 2000}
      transitionTime={1000}
    >
      {imgArr.map((item) => {
        return (
          <div key={item.name}>
            <img src={item.url} />
            <p className="legend">{item.name}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
