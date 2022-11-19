import React, { useEffect, useRef } from 'react';
import Search from '../Svg/Search';

const Input = (): JSX.Element => {
  const boxRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoxFocus = (): void => {
    boxRef.current?.classList.add('rounded-l-none');
    boxRef.current?.classList.add('border-blue-800');
    inputRef.current?.classList.add('shadow-inner');
    leftSvgRef.current?.classList.add('shadow-inner');
    leftSvgRef.current?.classList.remove('md:hidden');
  };

  const handleBoxBlur = (): void => {
    boxRef.current?.classList.remove('rounded-l-none');
    boxRef.current?.classList.remove('border-blue-800');
    inputRef.current?.classList.remove('shadow-inner');
    leftSvgRef.current?.classList.remove('shadow-inner');
    leftSvgRef.current?.classList.add('md:hidden');
  };

  return (
    <div className='relative flex'>
      <div
        ref={boxRef}
        onFocus={handleBoxFocus}
        onBlur={handleBoxBlur}
        className='w-full rounded-l-full border border-gray-300 relative'>
        <div
          ref={leftSvgRef}
          className='w-12 absolute -left-7 -top-[1px] h-[40px] flex justify-center items-center bg-white border border-blue-800 border-r-0 rounded-l-full md:hidden'>
          <Search size='mini'/>
        </div>
        <input
          ref={inputRef}
          className='w-full h-[38px] outline-none pl-5 rounded-l-full'
          placeholder='Search'
          type="text" />

      </div>
      <button
        type='button'
        className='group w-16 h-10 flex justify-center items-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition-all relative'>
        <Search size='normal'/>
        <div className='absolute top-14 bg-gray-500 text-white text-xs px-2 py-2 rounded-[4px] hidden group-hover:block'>
          <p>Search</p>
        </div>
      </button>
    </div>
  );
};

export default Input;
