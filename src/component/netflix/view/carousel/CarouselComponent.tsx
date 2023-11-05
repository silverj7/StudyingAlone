import React, { useState } from 'react';
import CarouselStyle from './CarouselStyle.module.scss';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselType {
  title: string;
  imgSrc: string;
}

// CarouselMenu List
const CarouselMenu: CarouselType[] = [
  { title: '무인도의 디바', imgSrc: 'images/netflix/carousel/img01.webp' },
  { title: '힘쎈여자 강남순', imgSrc: 'images/netflix/carousel/img02.webp' },
  { title: '국민사형투표', imgSrc: 'images/netflix/carousel/img03.webp' },
  {
    title: '정신병동에도 아침이 와요',
    imgSrc: 'images/netflix/carousel/img04.jpg',
  },
  { title: '19/20', imgSrc: 'images/netflix/carousel/img05.jpg' },
  { title: '혜미리예채파', imgSrc: 'images/netflix/carousel/img06.webp' },
  { title: '이두나!', imgSrc: 'images/netflix/carousel/img07.jpg' },
  { title: '아는형님', imgSrc: 'images/netflix/carousel/img08.webp' },
  { title: '하이쿠키', imgSrc: 'images/netflix/carousel/img09.webp' },
  { title: '오늘도 사랑스럽개', imgSrc: 'images/netflix/carousel/img10.webp' },
  { title: '그해우리는', imgSrc: 'images/netflix/carousel/img11.webp' },
  { title: '혼례대첩', imgSrc: 'images/netflix/carousel/img12.webp' },
  { title: '무인도의 디바', imgSrc: 'images/netflix/carousel/img01.webp' },
  { title: '힘쎈여자 강남순', imgSrc: 'images/netflix/carousel/img02.webp' },
  { title: '국민사형투표', imgSrc: 'images/netflix/carousel/img03.webp' },
  {
    title: '정신병동에도 아침이 와요',
    imgSrc: 'images/netflix/carousel/img04.jpg',
  },
  { title: '19/20', imgSrc: 'images/netflix/carousel/img05.jpg' },
  { title: '혜미리예채파', imgSrc: 'images/netflix/carousel/img06.webp' },
  { title: '이두나!', imgSrc: 'images/netflix/carousel/img07.jpg' },
  { title: '아는형님', imgSrc: 'images/netflix/carousel/img08.webp' },
  { title: '하이쿠키', imgSrc: 'images/netflix/carousel/img09.webp' },
  { title: '오늘도 사랑스럽개', imgSrc: 'images/netflix/carousel/img10.webp' },
  { title: '그해우리는', imgSrc: 'images/netflix/carousel/img11.webp' },
  { title: '혼례대첩', imgSrc: 'images/netflix/carousel/img12.webp' },
];

interface CarouselProp {}

const CarouselComponent = (props: CarouselProp) => {
  return (
    <div>
      <div>한국이 만든 콘텐츠</div>
      <div className={CarouselStyle.wrapper}>
        <Swiper
          modules={[Navigation]}
          className={CarouselStyle.swiperWrapper}
          navigation
          rewind={true}
          spaceBetween={8}
          slidesPerView={2.5}
          slidesOffsetBefore={60}
          slidesOffsetAfter={60}
          slidesPerGroup={6}
          // navigation={{
          //  nextEl: '.swiper-button-next',
          // prevEl: '.swiper-button-prev',
          // }}
          breakpoints={{
            1400: {
              slidesPerView: 6.5,
            },
            1100: {
              slidesPerView: 4.5,
            },
            800: {
              slidesPerView: 3.5,
            },
            500: {
              slidesPerView: 2.5,
            },
          }}
        >
          {CarouselMenu.map((item: any, index: number) => {
            return (
              <SwiperSlide>
                <img
                  key={`itemBox` + index}
                  // className={CarouselStyle.itemImg}
                  src={item.imgSrc}
                  alt={item.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselComponent;
