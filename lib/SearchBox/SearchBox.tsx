import React, { createContext, CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { Results } from './Results';
import { Search } from './Svg';
import { ISearchBoxContext, ISearchBoxProps, ISearchBoxProvider, ISearchResult } from '../types';
import useIsMobile from '../hooks/useIsMobile';
import DummyInput from './DummyInput/DummyInput';
import nightModeListener from '../utils/nightModeListener';
import addWhite from '../utils/addWhite';
import { filterCondition } from '../utils/filterCondition';
const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);
const SearchBox: React.FC<ISearchBoxProps> = (
  {
    onChange,
    onClick,
    onSearch,
    results,
    nightMode = false,
    placeholder,
    sx = {}
  }
) => {
  const {
    lightBg = '#FFFFFF',
    darkBg = '#0F0F0F'
  } = sx;

  const { isMobile } = useIsMobile();
  const { lightDark } = addWhite(darkBg, 20);

  const [showSB, setShowSB] = useState(true);
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [filteredResults, setFilteredResults] = useState<ISearchResult[]>([]);
  const [arr, setArr] = useState<ISearchResult[]>();
  const [active, setActive] = useState(-1);
  const [showLeftSearchSvg, setShowLeftSearchSvg] = useState(false);
  const [showDummyInput, setShowDummyInput] = useState(false);

  const refs = {
    main: useRef<HTMLDivElement>(null),
    input: useRef<HTMLInputElement>(null),
    result: useRef<HTMLDivElement>(null),
    respBg: useRef<HTMLDivElement>(null),
    inputSearchIcon: useRef<HTMLDivElement>(null),
    clearButton: useRef<HTMLButtonElement>(null),
    dummyInput: useRef<HTMLDivElement>(null),
    respSbButton: useRef<HTMLButtonElement>(null)
  };

  const handleClick = (): void => {
    setShowSB(true);
  };

  const ctxValue = {
    refs,
    showSB,
    setShowSB,
    results,
    placeholder,
    onChange,
    onClick,
    filteredResults,
    setFilteredResults,
    value,
    setValue,
    tempVal,
    setTempVal,
    showLeftSearchSvg,
    setShowLeftSearchSvg,
    showDummyInput,
    setShowDummyInput,
    darkBg,
    lightBg,
    arr,
    setArr,
    active,
    setActive,
    onSearch
  };

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!refs.main.current?.contains(e.target as HTMLDivElement)) {
        setShowLeftSearchSvg(false);
        setValue('');
      }
      if (isMobile) {
        if (refs.respBg.current?.contains(e.target as HTMLDivElement)) {
          setShowSB(false);
          setShowDummyInput(false);
          refs.respSbButton.current?.classList.remove('hidden');
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
    if (isMobile && showSB) refs.input.current?.focus();
  }, [showSB]);

  useEffect(() => {
    setArr(results?.slice(0, 10).filter(async item => filterCondition(item, value)));
  }, [results]);

  nightModeListener(nightMode);

  return (
    <div style={{
      '--lightBg': lightBg,
      '--darkBg': darkBg,
      '--darkBgSecondary': lightDark
    } as CSSProperties}>
      <SearchBoxContext.Provider value={ctxValue}>
        { isMobile &&
          <div className='flex'>
            {showDummyInput && <DummyInput/> }
            <button
              ref={refs.respSbButton}
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
          ref={refs.main}
          id='sbly'
          role='searchbox'
          className='searchbox'>
          <Input />
          <Results/>
        </div>
        }
      </SearchBoxContext.Provider>
    </div>
  );
};
export const useSearchBoxContext = (): ISearchBoxContext => {
  const cx = useContext(SearchBoxContext);
  return cx;
};
export default SearchBox;
