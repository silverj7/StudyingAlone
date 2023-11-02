import React, { useState } from 'react';
import useMedia from '../../useMedia/useMedia';
import GnbStyle from './GnbStyle.module.scss';
import classNames from 'classnames';

interface GnbMenuType {
  name: string;
}

// GnbMenu li List
const GnbMenu: GnbMenuType[] = [
  { name: '홈' },
  { name: '시리즈' },
  { name: '영화' },
  { name: 'NEW! 요즘 대세 콘텐츠' },
  { name: '내가 찜한 리스트' },
  { name: '언어별로 찾아보기' },
];

interface GnbPropsType {
  isScroll: boolean;
}

const GnbComponent = (props: GnbPropsType) => {
  const { isScroll } = props;

  const { isTablet } = useMedia();

  // tablet 이하 사이즈일때 메뉴 mouseOver state
  const [isDropOpen, setIsDropOpen] = useState(false);

  // mouseOver event 함수 (mouseOver state 값 변경)
  const handleMouseEnter = () => {
    setIsDropOpen(true);
  };

  return (
    <div
      className={classNames(GnbStyle.gnbWrapper, isScroll && GnbStyle.bgBlack)}
    >
      <nav className={GnbStyle.nav}>
        <img
          className={GnbStyle.logo}
          src="/images/netflix/logo/n_logo.png"
          alt="logo"
        />
        <div>
          {isTablet ? (
            // isTablet Size 이하부터 -> 메뉴 드롭다운
            <ul className={GnbStyle.ul}>
              <li aria-expanded={isDropOpen ? 'true' : 'false'}>
                <a
                  href="/netflix"
                  className={GnbStyle.liDropWrap}
                  onMouseOver={handleMouseEnter}
                >
                  메뉴
                  {isDropOpen && (
                    <div className={GnbStyle.liDropMenu}>
                      <div className={GnbStyle.liDropArrow}></div>
                      <div className={GnbStyle.liDropBar}></div>
                      <ul className={GnbStyle.liDropMenuUl}>
                        {GnbMenu.map((item: GnbMenuType) => {
                          return (
                            <li className={GnbStyle.liDropMenuItem}>
                              <a
                                href="#"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                }}
                              >
                                {item.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </a>
              </li>
            </ul>
          ) : (
            // tablet 이상 사이즈일때 보여줄 dom
            <ul className={GnbStyle.ul}>
              {GnbMenu.map((item: GnbMenuType) => {
                return (
                  <li className={GnbStyle.li}>
                    <a
                      href="#"
                      onClick={(e: any) => {
                        e.preventDefault();
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
      <div className={GnbStyle.rightNav}>
        <div>검색</div>
        <div>알림</div>
        <div>프로필</div>
      </div>
    </div>
  );
};

export default GnbComponent;
