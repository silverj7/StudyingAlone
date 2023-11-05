import React from 'react';
import CarouselStyle from './CarouselStyle.module.scss';

interface CarouselTitleProp {
  title: string; // Carousel 재사용을 위한 title props
}

const CarouselTitleComponent = (props: CarouselTitleProp) => {
  const { title } = props;

  return <div className={CarouselStyle.itemTitle}>{title}</div>;
};

export default CarouselTitleComponent;
