import React, { useEffect, useRef, useState } from 'react';
import CarouselStyle from './CarouselStyle.module.scss';
import CarouselTitleComponent from './CarouselTitleComponent';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    imgSrc: 'images/netflix/carousel/scale_img04.jpg',
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

interface CarouselProp {
  title: string; // Carousel 재사용을 위한 title props
}

const CarouselComponent = (props: CarouselProp) => {
  const { title } = props;
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef(null);
  const ImgRef = useRef(null);
  const [realIndex, setRealIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [remove, setRemove] = useState(true);
  const [video, setVideo] = useState(false);
  const [muted, setMuted] = useState(mutedProp);
  const [videoSRC, setVideoSRC] = useState('');

  useEffect(() => {
    if (!navigationPrevRef.current) return;

    if (realIndex === 0) {
      navigationPrevRef.current.style.display = 'none';
    } else {
      navigationPrevRef.current.style.display = 'flex';
    }
  }, [realIndex]);

  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter = (e: any) => {
    clearInterval(ImgRef.current);
    ImgRef.current = setTimeout(() => {
      setActive(true);
      setRemove(false);
      setVideo(true);
    }, 1000);
  };
  const onMouseLeave = (e: any) => {
    setActive(false);
    setVideo(false);
    console.log(e);
  };

  return (
    <div className={CarouselStyle.itemWrapper}>
      <CarouselTitleComponent title={title} />
      <div className={CarouselStyle.itemInner}>
        <Swiper
          modules={[Navigation]}
          className={CarouselStyle.swiperWrapper}
          rewind={true}
          spaceBetween={4}
          slidesPerView={2.15}
          slidesPerGroup={6}
          speed={1500}
          allowTouchMove={false}
          onActiveIndexChange={(swiper) => {
            setRealIndex(swiper.realIndex);
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          breakpoints={{
            1400: {
              spaceBetween: 8,
              slidesPerView: 6.25,
            },
            1100: {
              spaceBetween: 6,
              slidesPerView: 5.25,
            },
            800: {
              spaceBetween: 4,
              slidesPerView: 4.2,
            },
            500: {
              spaceBetween: 4,
              slidesPerView: 3.2,
            },
          }}
        >
          <>
            <div ref={navigationPrevRef} className={CarouselStyle.arrowLeft}>
              <FaChevronLeft
                className={CarouselStyle.arrowLeftImg}
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                  color: '#fff',
                }}
              />
            </div>
            <div ref={navigationNextRef} className={CarouselStyle.arrowRight}>
              <FaChevronRight
                className={CarouselStyle.arrowRightImg}
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                  color: '#fff',
                }}
              />
            </div>
          </>
          {CarouselMenu.map((item: any, index: number) => {
            return (
              <SwiperSlide ref={ImgRef} className={CarouselStyle.SwiperSlide}>
                <img
                  key={`itemBox` + index}
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
