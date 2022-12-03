import React, { useContext, useEffect, useState } from 'react';
import { ISearchResult } from '../../types';
import { useSearchBoxContext } from '../SearchBox';
import { SearchLI } from '../Svg';
import Arrow from '../Svg/Arrow';

const Results = (): JSX.Element => {
  const ctx = useSearchBoxContext();
  const [resultsLen, setResultsLen] = useState(0);

  const filteringCondition = (title: string): string | undefined => {
    if (ctx.value === '') return undefined;
    if (ctx.value.length > 1 && title.toLowerCase().includes(ctx.value.toLowerCase())) {
      return title;
    }
  };

  const highlightedResult = (title: string): JSX.Element => {
    let span = <span role='results-text' className=''>{title}</span>;
    const splitted = title.split(new RegExp(`(${ctx.value})`, 'gi'));
    if (splitted.length > 1) {
      span =
        <div role='results-text' className='text-sm md:text-base'>
          <span >{splitted[0]}</span>
          <span className='font-semibold' >{splitted[1]}</span>
          <span >{splitted[2]}</span>
        </div>;
    }
    return span;
  };

  const handleOnClick = (item: ISearchResult): void => {
    ctx.setTempVal(item.title);
    ctx.setValue('');
    ctx.onClick(item);
    if (ctx.isMobile) {
      ctx.respBgRef.current?.classList.add('hidden');
      ctx.setShowSB(false);
      ctx.setShowDummyInput(true);
      ctx.respSbButton.current?.classList.add('hidden');
      ctx.dummyInputRef.current?.classList.remove('hidden');
    }
  };

  const handleSelect = (title: string): void => {
    ctx.setValue(title);
    ctx.setTempVal(title);
    ctx.inputRef.current?.focus();
  };

  useEffect(() => {
    setResultsLen(ctx.results.filter((item) => filteringCondition(item.title)).length);
  }, [ctx.value]);

  return (
    <>
      {resultsLen > 0 &&
      <div ref={ctx.resultRef} className='results'>
        <div className='ghost' />
        <ul role='search-results' className='results-ul'>
          { ctx.results.filter(item => filteringCondition(item.title)).map(item =>
            <li
              key={item.id}
              className='results-li'>
              <button
                className='w-full text-left flex'
                onClick={() => handleOnClick(item)}
              >
                {!ctx.isMobile &&
                <div className='results-li-icon'>
                  <SearchLI size='mini'/>
                </div>
                }
                {highlightedResult(item.title)}
              </button>
              <button type='button' role='arrow-button' onClick={() => handleSelect(item.title)} className='arrow'>
                <Arrow/>
              </button>
            </li>
          )}
        </ul>
      </div>
      }
    </>
  );
};

export default Results;
