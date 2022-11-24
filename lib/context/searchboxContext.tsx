import React, { createContext, ReactNode, useContext, useReducer, useRef, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import { ISearchBoxContext, ISearchBoxProps, ISearchBoxProvider, ISearchResult } from '../types';

const mainRef = useRef<HTMLDivElement>(null);
const topRef = useRef<HTMLDivElement>(null);
const searchButtonRef = useRef<HTMLButtonElement>(null);
const backButtonRef = useRef<HTMLButtonElement>(null);
const rightDivRef = useRef<HTMLDivElement>(null);
const middleDivRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLInputElement>(null);
const resultRef = useRef<HTMLDivElement>(null);

const { isMobile } = useIsMobile();
const [showSB, setShowSB] = useState(false);
const [value, setValue] = useState('');
const [tempVal, setTempVal] = useState('');
const [filteredResults, setFilteredResults] = useState<ISearchResult[]>([]);

const setBlurSB = (): void => {
  if (isMobile) {
    setShowSB(false);
    mainRef.current?.classList.remove('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
    topRef.current?.classList.remove('custom-box-shadow', 'justify-evenly');
    searchButtonRef.current?.classList.remove('bg-gray-100', 'rounded-r-full');
    backButtonRef.current?.classList.add('hidden');
    backButtonRef.current?.classList.remove('flex');
    rightDivRef.current?.classList.add('hidden');
    middleDivRef.current?.classList.remove('basis-9/12');
  } else {
    // blursb for !responsive
  }
};

const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);
export const useSearchBoxContext = (): ISearchBoxContext => {
  const cx = useContext(SearchBoxContext);
  return cx;
};

export const SearchBoxProvider: React.FC<ISearchBoxProvider> = ({ children }) => {
  const cxValue = {
    isMobile,
    mainRef,
    topRef,
    rightDivRef,
    middleDivRef,
    searchButtonRef,
    backButtonRef,
    inputRef,
    resultRef,
    showSB,
    setShowSB,
    setBlurSB,
    results: [],
    onChange: () => {},
    filteredResults,
    setFilteredResults,
    value,
    setValue,
    tempVal,
    setTempVal
  };
  return (
    <SearchBoxContext.Provider value={cxValue}>
      {children}
    </SearchBoxContext.Provider>
  );
};
