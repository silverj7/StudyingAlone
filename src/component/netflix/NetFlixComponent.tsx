import React, { useEffect, useState } from 'react';
import GnbComponent from './view/gnbmenu/GnbComponent';
import MainVideoComponent from './view/mainMedia/MainMediaComponent';
import NetFlixStyle from './NetFlixStyle.module.scss';
import CarouselComponent from './view/carousel/CarouselComponent';

type Props = {};

const NetFlixComponent = (props: Props) => {
  // scroll 감지 state (GnbComponent용)
  const [isScroll, setIsScroll] = useState(false);

  // scroll 관련 함수  (GnbComponent용)
  const handleScroll = () => {
    // 스크롤이 1px 이상 내려갔을때
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  // scroll 관련 hook (GnbComponent용)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // dom unMount시 스크롤감지 이벤트 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={NetFlixStyle.wrapper}>
      <GnbComponent isScroll={isScroll} />
      <MainVideoComponent />
      <CarouselComponent />
    </div>
  );
};

export default NetFlixComponent;
