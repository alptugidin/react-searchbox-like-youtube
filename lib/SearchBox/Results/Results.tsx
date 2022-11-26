import React, { useContext, useEffect, useState } from 'react';
import { ISearchResult } from '../../types';
import { useSearchBoxContext } from '../SearchBox';
import { Search } from '../Svg';
import Arrow from '../Svg/Arrow';

const Results = (): JSX.Element => {
  const cx = useSearchBoxContext();
  const [resultsLen, setResultsLen] = useState(0);

  const filteringCondition = (title: string): string | undefined => {
    if (cx.value === '') return undefined;
    if (cx.value.length > 1 && title.toLowerCase().includes(cx.value.toLowerCase())) {
      return title;
    }
  };

  const highlightedResult = (title: string): JSX.Element => {
    let span = <span className=''>{title}</span>;
    const splitted = title.split(new RegExp(`(${cx.value})`, 'gi'));
    if (splitted.length > 1) {
      span =
        <div className='text-sm md:text-base'>
          <span >{splitted[0]}</span>
          <span className='font-semibold' >{splitted[1]}</span>
          <span >{splitted[2]}</span>
        </div>;
    }
    return span;
  };

  const handleOnClick = (item: ISearchResult): void => {
    cx.setTempVal(item.title);
    cx.setValue('');
  };

  const handleSelect = (title: string): void => {
    cx.setValue(title);
    cx.setTempVal(title);
    cx.inputRef.current?.focus();
  };

  useEffect(() => {
    setResultsLen(cx.results.filter((item) => filteringCondition(item.title)).length);
  }, [cx.value]);

  return (
    <div className='md:w-[calc(100%_-_33px)] w-full bg-white custom-box-shadow md:rounded-xl rounded-none absolute md:top-11 top-[48px] md:-left-[26px] left-0 md:overflow-hidden overflow-visible'>
      {cx.value !== '' && resultsLen > 0 && (
        <ul role='listResults' className='md:py-3'>
          <div className='bg-white absolute left-0 -top-1 right-0 h-1.5'></div>
          {
            cx.results.filter(item => filteringCondition(item.title)).map(item => (
              <li key={item.id} className='flex h-[38px] items-center border-b-[1px] md:border-none border-gray-100 md:py-0 md:px-0 pl-2'>
                <button
                  type='button'
                  onClick={() => handleOnClick(item)}
                  className='flex items-center cursor-default md:hover:bg-gray-100 h-8 leading-8 w-full'>
                  { !cx.isMobile &&
                    <div className='w-12 flex justify-center items-center'>
                      <Search size='mini' />
                    </div>
                  }
                  {highlightedResult(item.title)}
                </button>
                <button
                  type='button'
                  onClick={() => handleSelect(item.title)}
                  className='bg-gray-100 w-[38px] h-full flex items-center justify-center'>
                  <Arrow/>
                </button>
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};

export default Results;
