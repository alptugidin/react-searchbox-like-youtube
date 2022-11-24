import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Input } from './Input';
import { Results } from './Results';
import { ISearchBoxContext, ISearchBoxProps, ISearchResult } from '../types';
import useIsMobile from '../hooks/useIsMobile';

const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);

const SearchBox: React.FC<ISearchBoxProps> = ({ onChange, results }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);
  const middleDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const boxRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
=======
>>>>>>> 17bdbade2fe797901e4aa65e1da124b79a7de4b4

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
<<<<<<< HEAD
      leftSvgRef.current?.classList.add('md:hidden');
      setValue('');
      if (!isMobile) {
        boxRef.current?.classList.remove('rounded-l-none', '!border-blue-800');
        inputRef.current?.classList.remove('shadow-inner');
        leftSvgRef.current?.classList.remove('shadow-inner');
      }
=======
      // blursb for !responsive
>>>>>>> 17bdbade2fe797901e4aa65e1da124b79a7de4b4
    }
  };

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
<<<<<<< HEAD
    boxRef,
    leftSvgRef,
    modalRef,
=======
>>>>>>> 17bdbade2fe797901e4aa65e1da124b79a7de4b4
    showSB,
    setShowSB,
    setBlurSB,
    results,
    onChange,
    filteredResults,
    setFilteredResults,
    value,
    setValue,
    tempVal,
    setTempVal
  };

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!mainRef.current?.contains(e.target as Node)) {
        setBlurSB();
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div
      ref={mainRef}
      id='sbly'
      className='relative w-full z-30'>
      <SearchBoxContext.Provider value={cxValue}>
        <Input/>
        <Results/>
      </SearchBoxContext.Provider>
    </div>
  );
};
export const useSearchBoxContext = (): ISearchBoxContext => {
  const cx = useContext(SearchBoxContext);
  return cx;
};
export default SearchBox;
