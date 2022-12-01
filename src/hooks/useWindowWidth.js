import React from 'react';

export function useWindowWidth() {
  const getWindowWidth = React.useCallback(() => window.innerWidth, []);
  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth());

  React.useEffect(() => {

    function handleResize() {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', resizeThrottler, false);

    // обновляем размеры раз в 1.5 sec
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleResize();
        }, 1500);
      }
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [getWindowWidth]);

  return windowWidth;
}
