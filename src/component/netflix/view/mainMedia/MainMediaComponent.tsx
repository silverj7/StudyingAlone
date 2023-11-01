import React from 'react';
import MainMediaStyle from './MainMediaStyle.module.scss';

type Props = {};

const MainMediaComponent = (props: Props) => {
  return (
    <div className={MainMediaStyle.wrapper}>
      <div className={MainMediaStyle.ImgWrapper}>
        <img src="/images/main/mainImg.webp" alt="main" />
      </div>
      <div className={MainMediaStyle.ImgWrapper}>
        <img src="/images/main/mainImg.webp" alt="main" />
      </div>
    </div>
  );
};

export default MainMediaComponent;
