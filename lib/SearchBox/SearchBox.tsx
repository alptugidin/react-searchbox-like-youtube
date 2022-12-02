import React, { createContext, CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { Results } from './Results';
import { Search } from './Svg';
import { ISearchBoxContext, ISearchBoxProps, ISearchResult } from '../types';
import useIsMobile from '../hooks/useIsMobile';
import DummyInput from './DummyInput/DummyInput';
import nightModeListener from '../utils/nightModeListener';

const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);
const SearchBox: React.FC<ISearchBoxProps> = (
  {
    onChange,
    onClick,
    results,
    nightMode = false,
    sx = {}
  }
) => {
  const {
    lightBg = '#FFFFFF',
    darkBg = '#0F0F0F'
  } = sx;

  const { isMobile } = useIsMobile();
  const [showSB, setShowSB] = useState(true);
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [filteredResults, setFilteredResults] = useState<ISearchResult[]>([]);

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

  /** @branchDefinitions */
  const [showLeftSearchSvg, setShowLeftSearchSvg] = useState(false);
  const [showDummyInput, setShowDummyInput] = useState(false);
  const respBgRef = useRef<HTMLDivElement>(null);
  const inputSearchIconRef = useRef<HTMLDivElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const dummyInputRef = useRef<HTMLDivElement>(null);
  const respSbButton = useRef<HTMLButtonElement>(null);
  /** @branchDefinitions */

  const handleClick = (): void => {
    setShowSB(true);
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
    dummyInputRef,
    respSbButton,
    showLeftSearchSvg,
    setShowLeftSearchSvg,
    showDummyInput,
    setShowDummyInput,
    darkBg,
    lightBg
    /** @branchRef */
  };

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!mainRef.current?.contains(e.target as HTMLDivElement)) {
        setShowLeftSearchSvg(false);
        setValue('');
      }
      if (isMobile) {
        if (respBgRef.current?.contains(e.target as HTMLDivElement)) {
          setShowSB(false);
          setShowDummyInput(false);
        }
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowSB(false);
    } else {
      setShowSB(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && showSB) inputRef.current?.focus();
  }, [showSB]);

  nightModeListener(nightMode);

  return (
    <SearchBoxContext.Provider value={ctxValue}>
      <div style={{ '--lightBg': lightBg, '--darkBg': darkBg } as CSSProperties}>
        { isMobile &&
          <div className='flex'>
            {showDummyInput && <DummyInput/> }
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
        {showSB &&
        <div
          ref={mainRef}
          id='sbly'
          className='searchbox'>
          <Input />
          <Results/>
        </div>
        }
      </div>
    </SearchBoxContext.Provider>
  );
};
export const useSearchBoxContext = (): ISearchBoxContext => {
  const cx = useContext(SearchBoxContext);
  return cx;
};
export default SearchBox;
