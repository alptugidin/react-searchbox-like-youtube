import React, { createContext, useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { Results } from './Results';
import useIsMobile from './hooks/useIsMobile';
import { ISearchBoxContext } from '../types';

export const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);
const SearchBox: React.FC = () => {
  const { isMobile } = useIsMobile();
  const [showSB, setShowSB] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const value = {
    isMobile,
    mainRef,
    setShowSB,
    showSB
  };

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (mainRef.current != null && !mainRef.current?.contains(e.target as Node) && isMobile) {
        mainRef.current?.classList.remove('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
        setShowSB(false);
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [isMobile]);

  return (
    <div
      ref={mainRef}
      className='relative w-full z-30'>
      <SearchBoxContext.Provider value={value}>
        <Input/>
        <Results/>
      </SearchBoxContext.Provider>
    </div>
  );
};

export default SearchBox;
