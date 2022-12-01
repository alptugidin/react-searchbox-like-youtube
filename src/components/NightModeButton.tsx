import React, { useEffect } from 'react';
import { useSearchBoxContext } from '../../lib/SearchBox/SearchBox';

interface INightModeButton {
    setNightMode: (value: React.SetStateAction<boolean>) => void
    nightMode: boolean

}

const NightModeButton: React.FC<INightModeButton> = (props) => {
  const { setNightMode, nightMode } = props;
  const ctx = useSearchBoxContext();

  return (
    <button
      type='button'
      onClick={() => setNightMode(!nightMode)}
      className='relative w-[40px] h-[40px] rounded-full bg-red-600 overflow-hidden'>
      <img
        src="./sun.svg"
        alt="sun"
        className={`absolute right-0 top left-0 ml-auto mr-auto transition-all ${nightMode ? '-bottom-[38px]' : 'bottom-[8px]'}`}
      />
      <img
        src="./moon.svg"
        alt="moon"
        className={`absolute right-0 left-0 ml-auto mr-auto transition-all ${nightMode ? 'bottom-[8px]' : '-bottom-[38px]'}`}
      />
    </button>
  );
};

export default NightModeButton;
