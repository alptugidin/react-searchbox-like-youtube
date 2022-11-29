import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { Results } from './Results';
import { ISearchBoxContext, ISearchBoxProps, ISearchResult } from '../types';
import useIsMobile from '../hooks/useIsMobile';
import { Clear, Search } from './Svg';

const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);

const SearchBox: React.FC<ISearchBoxProps> = ({ onChange, onClick, results }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);
  const middleDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  /** @brancRef */
  const respBgRef = useRef<HTMLDivElement>(null);
  const inputSearchIconRef = useRef<HTMLDivElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const mockInputRef = useRef<HTMLDivElement>(null);
  const respSbButton = useRef<HTMLButtonElement>(null);
  /** @brancRef */

  const { isMobile } = useIsMobile();
  const [showSB, setShowSB] = useState(false);
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [filteredResults, setFilteredResults] = useState<ISearchResult[]>([]);

  const setBlurSB = (): void => {
    if (isMobile) {
      setShowSB(false);
      // mainRef.current?.classList.remove('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
      topRef.current?.classList.remove('custom-box-shadow');
      topRef.current?.classList.add('justify-end');
      searchButtonRef.current?.classList.remove('bg-gray-100', 'rounded-r-full');
      backButtonRef.current?.classList.add('hidden');
      backButtonRef.current?.classList.remove('flex');
      rightDivRef.current?.classList.add('hidden');
      middleDivRef.current?.classList.remove('basis-9/12');
    } else {
      leftSvgRef.current?.classList.add('md:hidden');
      setValue('');
      if (!isMobile) {
        boxRef.current?.classList.remove('rounded-l-none', '!border-blue-800');
        inputRef.current?.classList.remove('shadow-inner');
        leftSvgRef.current?.classList.remove('shadow-inner');
      }
    }
  };

  const handleClick = (): void => {
    mainRef.current?.classList.remove('!hidden');
    inputRef.current?.focus();
  };

  const handleMockInput = (): void => {
    mockInputRef.current?.classList.add('hidden');
    handleClick();
  };

  const ctxValue = {
    isMobile,
    mainRef,
    topRef,
    rightDivRef,
    middleDivRef,
    searchButtonRef,
    backButtonRef,
    inputRef,
    resultRef,
    boxRef,
    leftSvgRef,
    modalRef,
    showSB,
    setShowSB,
    setBlurSB,
    results,
    onChange,
    onClick,
    filteredResults,
    setFilteredResults,
    value,
    setValue,
    tempVal,
    setTempVal,
    /** @branchRef */
    inputSearchIconRef,
    clearButtonRef,
    respBgRef,
    mockInputRef,
    respSbButton
    /** @branchRef */
  };

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!mainRef.current?.contains(e.target as HTMLDivElement)) {
        inputSearchIconRef.current?.classList.add('!hidden');
        setValue('');
      }
      if (respBgRef.current?.contains(e.target as HTMLDivElement)) {
        mainRef.current?.classList.add('!hidden');
        respSbButton.current?.classList.remove('hidden');
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <SearchBoxContext.Provider value={ctxValue}>
      { isMobile &&
          <div className='flex'>
            <div
              ref={mockInputRef}
              onClick={handleMockInput}
              className='w-full hidden'>
              <div className='w-full h-8 bg-gray-100 rounded-lg items-center px-1.5 flex justify-between'>
                <span className='truncate text-sm text-gray-500'>{tempVal}</span>
                <div className='w-6 h-6'>
                  <Clear/>
                </div>
              </div>
            </div>
            <button
              ref={respSbButton}
              role='responsive-search-button'
              type='button'
              onClick={handleClick}
              className='w-fit block ml-auto'>
              <Search size='normal'/>
            </button>
          </div>
      }
      <div
        ref={mainRef}
        id='sbly'
        className={`searchbox ${isMobile ? '!hidden' : ''}`}>
        <Input/>
        <Results/>
      </div>
    </SearchBoxContext.Provider>
  );
};
export const useSearchBoxContext = (): ISearchBoxContext => {
  const cx = useContext(SearchBoxContext);
  return cx;
};
export default SearchBox;
