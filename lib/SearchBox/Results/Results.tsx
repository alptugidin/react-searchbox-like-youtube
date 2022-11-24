import React, { useContext, useEffect, useState } from 'react';
import { ISearchResult } from '../../types';
import { useSearchBoxContext } from '../SearchBox';
import { Search } from '../Svg';

const Results = (): JSX.Element => {
  const cx = useSearchBoxContext();
  const [resultsLen, setResultsLen] = useState(0);

  const filteringCondition = (title: string): string | undefined => {
    if (cx.value === '') return undefined;
    if (title.toLowerCase().includes(cx.value.toLowerCase())) {
      return title;
    }
  };

  const highlightedResult = (title: string): JSX.Element => {
    let span = <span >{title}</span>;
    const splitted = title.split(new RegExp(`(${cx.value})`, 'gi'));
    if (splitted.length > 1) {
      span =
        <div className={'sb-highlight-div'}>
          <span >{splitted[0]}</span>
          <span className='font-semibold' >{splitted[1]}</span>
          <span >{splitted[2]}</span>
        </div>;
    }
    return span;
  };

  const handleClick = (onClickData: ISearchResult): void => {
    console.log(onClickData);
    cx.setTempVal(onClickData.title);
    cx.setValue('');
  };

  useEffect(() => {
    setResultsLen(cx.results.filter((item) => filteringCondition(item.title)).length);
  }, [cx.value]);

  return (
    <div
      ref={cx.resultRef}
      className='md:w-[calc(100%_-_33px)] w-full bg-white custom-box-shadow md:rounded-xl absolute md:top-11 md:-left-[26px] md:overflow-hidden'
    >
      {cx.value !== '' && resultsLen > 0 && (
        <>
          {cx.isMobile && <div className='bg-white absolute w-full h-[3px] -top-[1px]' />}
          <ul role='listResults' className='py-3'>
            {
              cx.results.filter(item => filteringCondition(item.title)).map(item => (
                <li key={item.id} className=''>
                  <button
                    type='button'
                    role='selectli'
                    onClick={() => handleClick(item)}
                    className='w-full flex items-center cursor-default hover:bg-gray-100 h-8 leading-8'>
                    <div className='w-12 flex justify-center items-center'>
                      <Search size='mini' />
                    </div>
                    {highlightedResult(item.title)}
                  </button>
                </li>
              ))
            }
          </ul>
        </>
      )}
    </div>
  );
};

export default Results;
