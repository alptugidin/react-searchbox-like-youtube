import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchBoxContext } from '../SearchBox';
import { Search } from '../Svg';
const Input = (): JSX.Element => {
  const context = useContext(SearchBoxContext);

  const boxRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (): void => {
    if (context.isMobile) {
      context.setShowSB(true);
      context.mainRef.current?.classList.add('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
      topRef.current?.classList.add('custom-box-shadow');
    }
  };

  const handleBoxFocus = (): void => {
    leftSvgRef.current?.classList.remove('md:hidden');
    boxRef.current?.classList.add('rounded-l-none', '!border-blue-800');
    inputRef.current?.classList.add('shadow-inner');
    leftSvgRef.current?.classList.add('shadow-inner');
  };

  const handleBoxBlur = (): void => {
    leftSvgRef.current?.classList.add('md:hidden');
    boxRef.current?.classList.remove('rounded-l-none', '!border-blue-800');
    inputRef.current?.classList.remove('shadow-inner');
    leftSvgRef.current?.classList.remove('shadow-inner');
  };

  useEffect(() => {
    if (!context.isMobile) {
      context.setShowSB(true);
    } else {
      context.setShowSB(false);
    }
  }, [context.isMobile]);

  return (
    <div ref={topRef} className='relative flex justify-end md:py-0 py-2'>
      <div
        ref={boxRef}
        onFocus={handleBoxFocus}
        onBlur={handleBoxBlur}
        className={'w-full rounded-l-full border border-gray-300 relative ' + (context.showSB ? 'block' : 'hidden')}>
        {!context.isMobile && (
          <div
            ref={leftSvgRef}
            className='w-12 absolute -left-7 -top-[1px] h-[40px] flex justify-center items-center bg-white border border-blue-800
           border-r-0 rounded-l-full md:hidden'>
            <div className='h-[34px] bottom-0 w-1 bg-white absolute -right-0'></div>
            <Search size='mini'/>
          </div>
        ) }
        <input
          ref={inputRef}
          className='w-full md:h-[38px] h-[30px] outline-none pl-5 rounded-l-full'
          placeholder='Search'
          type="text" />

      </div>
      <button
        type='button'
        onClick={handleSearch}
        className={`group w-16 md:h-10 h-8 flex justify-center items-center relative ${!context.showSB ? '' : 'border border-l-0 border-gray-300 rounded-r-full md:bg-gray-100 md:hover:bg-gray-200 transition-all'}`}>
        <Search size='normal'/>
        { !context.isMobile &&
          <div className='absolute top-14 bg-gray-500 text-white text-xs px-2 py-2 rounded-[4px] hidden group-hover:block bg-opacity-80'>
            <p>Search</p>
          </div>
        }
      </button>
    </div>
  );
};

export default Input;
