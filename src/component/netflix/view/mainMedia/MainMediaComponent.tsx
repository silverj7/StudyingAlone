import React from 'react';
import MainMediaStyle from './MainMediaStyle.module.scss';

type Props = {};

const MainMediaComponent = (props: Props) => {
  return (
    <div className={MainMediaStyle.wrapper}>
      <div className={MainMediaStyle.mainImgWrapper}>
        <div
          className={MainMediaStyle.mainImg}
          style={{
            backgroundImage: 'url(/images/main/mainImg.webp)',
          }}
        />
        <div className={MainMediaStyle.playDescWrap}>
          <button className={MainMediaStyle.playBtn}>재생</button>
          <button className={MainMediaStyle.descBtn}>상세 정보</button>
        </div>
      </div>
    </div>
  );
};

export default MainMediaComponent;
