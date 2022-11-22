import React, { useContext, useState } from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Search } from '../Svg';

const Results = (): JSX.Element => {
  const filteringCondition = (title: string): string | undefined => {
    if (cx.value === '') return undefined;
    if (title.toLocaleLowerCase().includes(cx.value)) {
      return title;
    }
  };
  const cx = useSearchBoxContext();
  return (
    <div className='w-[calc(100%_-_33px)] bg-white custom-box-shadow rounded-xl absolute top-11 -left-[26px] overflow-hidden'>
      { cx.value !== '' && cx.results !== undefined && (
        <ul className='py-3'>
          {
            cx.results.filter(item => filteringCondition(item.title)).map(item => (
              <li key={item.id} className=''>
                <div className='flex cursor-default hover:bg-gray-100 h-8 leading-8'>
                  <div className='w-12 flex justify-center items-center'>
                    <Search size='mini'/>
                  </div>
                  <p>{item.title}</p>
                </div>
              </li>
            ))
          }
        </ul>
      )}
      <p>{cx.results.length}</p>
    </div>
  );
};

export default Results;
