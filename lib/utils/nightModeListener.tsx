import React, { useEffect } from 'react';
import { useSearchBoxContext } from '../SearchBox/SearchBox';

// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   document.documentElement.classList.add('dark');
// } else {
//   document.documentElement.classList.remove('dark');
// }
const nightModeListener = (nightMode: boolean): void => {
  useEffect(() => {
    if (nightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [nightMode]);
};

export default nightModeListener;
