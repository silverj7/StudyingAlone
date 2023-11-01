import { useEffect, useState } from 'react';

export const WINDOW_SIZE = {
  PC: 1024,
  TABLET: 884,
};

const useMedia = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTablet, setIsTablet] = useState(false);

  const windowSizeCheck = () => {
    if (window.innerWidth >= WINDOW_SIZE.PC) {
      setIsDesktop(true);
      setIsTablet(false);
    } else if (window.innerWidth >= WINDOW_SIZE.TABLET) {
      setIsDesktop(false);
      setIsTablet(true);
    }
  };

  const handle = (e: any) => {
    windowSizeCheck();
  };

  useEffect(() => {
    windowSizeCheck();
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('resize', handle);
    };
  }, []);

  return { isDesktop, isTablet };
};
export default useMedia;
