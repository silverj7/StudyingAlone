import React, { useState } from 'react';
import GnbStyle from './GnbStyle.module.scss';
import { isMobile } from 'react-device-detect';

interface GnbMenuType {
  name: string;
}

const GnbMenu: GnbMenuType[] = [
  { name: '홈' },
  { name: '시리즈' },
  { name: '영화' },
  { name: 'NEW! 요즘 대세 콘텐츠' },
  { name: '내가 찜한 리스트' },
  { name: '언어별로 찾아보기' },
];

interface PropsType {}

const GnbComponent = (props: PropsType) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div>
      <nav>
        <div>
          <img
            className={GnbStyle.logo}
            src="/images/logo/n_logo.png"
            alt="logo"
          />
        </div>
        <div>
          <ul className={GnbStyle.liDrop}>
            {/* mo Size -> 메뉴 드롭다운 */}
            <li className={GnbStyle.li}>
              메뉴
              {isDropOpen && (
                <ul>
                  <li></li>
                </ul>
              )}
            </li>
            {/* mo Size -> 메뉴 드롭다운 */}
            {!isMobile &&
              GnbMenu.map((item: GnbMenuType) => {
                return <li className={GnbStyle.li}>{item.name}</li>;
              })}
          </ul>
        </div>
      </nav>
      <div>
        <div>검색</div>
        <div>알림</div>
        <div>프로필</div>
      </div>
    </div>
  );
};

export default GnbComponent;
