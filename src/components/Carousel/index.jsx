import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = (props) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop={true}
      axis={props.type === 'animal' ? 'horizontal' : 'vertical'}
      interval={props.type === 'animal' ? 3000 : 2000}
      transitionTime={1000}
    >
      <div key={1}>
        <img src="https://api.zylearning.top/api/wallpaper?lx=dw" />
        <p className="legend">动物识别</p>
      </div>
      <div key={2}>
        <img src={require('@/assets/plant.png')} />
        <p className="legend">植物识别</p>
      </div>
      <div key={3}>
        <img src={require('@/assets/money.png')} />
        <p className="legend">货币识别</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
