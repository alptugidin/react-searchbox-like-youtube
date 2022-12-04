import React, { FC, useContext, useEffect, useState } from 'react';
import { ISearchResult } from '../../types';
import { filterCondition } from '../../utils/filterCondition';
import { useSearchBoxContext } from '../SearchBox';
import { SearchLI } from '../Svg';
import Arrow from '../Svg/Arrow';

const Results: FC = () => {
  const ctx = useSearchBoxContext();
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
      ctx.refs.respBg.current?.classList.add('hidden');
      ctx.setShowSB(false);
      ctx.setShowDummyInput(true);
      ctx.refs.respSbButton.current?.classList.add('hidden');
      ctx.refs.dummyInput.current?.classList.remove('hidden');
    }
  };

  const handleSelect = (title: string): void => {
    ctx.setValue(title);
    ctx.setTempVal(title);
    ctx.refs.input.current?.focus();
    ctx.setArr(ctx.results?.slice(0, 10).filter(item => filterCondition(item, title)));
  };

  useEffect(() => {
    if (ctx.value.length < 2) {
      ctx.setArr(undefined);
    }
  }, [ctx.value]);

  return (
    <>
      {ctx.arr !== undefined && ctx.arr.length > 0 && ctx.value.length > 1 &&
      <div ref={ctx.refs.result} className='results'>
        <div className='ghost' />
        <ul role='search-results' className='results-ul'>
          { ctx.arr.map((item, index) =>
            <li
              key={item.id}
              className={`results-li ${ctx.active === index ? 'bg-[#00000010]' : ''}`}>
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
              <button
                type='button'
                role='arrow-button'
                className='arrow'
                onClick={() => handleSelect(item.title)}>
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
