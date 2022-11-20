import React, { useContext, useEffect, useRef, useState } from 'react';
import { setFocusSB } from '../../utils/setFocusSB';
import { SearchBoxContext } from '../SearchBox';
import { Back, Search } from '../Svg';
const Input = (): JSX.Element => {
  const cx = useContext(SearchBoxContext);

  const boxRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<HTMLDivElement>(null);

  const handleSearch = (): void => {
    setFocusSB(cx);
  };

  const handleBack = (): void => {
    cx.setBlurSB();
  };

  const handleBoxFocus = (): void => {
    leftSvgRef.current?.classList.remove('md:hidden');
    boxRef.current?.classList.add('rounded-l-none', '!border-blue-800');
    if (!cx.isMobile) {
      cx.inputRef.current?.classList.add('shadow-inner');
      leftSvgRef.current?.classList.add('shadow-inner');
    }
  };

  const handleBoxBlur = (): void => {
    leftSvgRef.current?.classList.add('md:hidden');
    boxRef.current?.classList.remove('rounded-l-none', '!border-blue-800');
    if (!cx.isMobile) {
      cx.inputRef.current?.classList.remove('shadow-inner');
      leftSvgRef.current?.classList.remove('shadow-inner');
    }
  };

  useEffect(() => {
    if (!cx.isMobile) {
      cx.setShowSB(true);
    } else {
      cx.setShowSB(false);
    }
  }, [cx.isMobile]);

  return (
    <>
      <div ref={cx.topRef} className='relative md:block flex justify-end md:py-0 py-2'>
        { cx.isMobile &&
          <button
            type='button'
            onClick={handleBack}
            ref={cx.backButtonRef}
            className='hidden basis-1/12  justify-center items-center'>
            <Back/>
          </button>
        }
        <div ref={cx.middleDivRef} className='flex'>
          <div
            ref={boxRef}
            onFocus={handleBoxFocus}
            onBlur={handleBoxBlur}
            className={'w-full rounded-l-full md:border md:border-gray-300 relative ' + (cx.showSB ? 'block' : 'hidden')}>
            {!cx.isMobile && (
              <div
                ref={leftSvgRef}
                className='w-12 absolute -left-7 -top-[1px] h-[40px] flex justify-center items-center bg-white border border-blue-800
           border-r-0 rounded-l-full md:hidden'>
                <div className='h-[34px] bottom-0 w-1 bg-white absolute -right-0'></div>
                <Search size='mini'/>
              </div>
            ) }
            <input
              ref={cx.inputRef}
              className='w-full md:h-[38px] h-[32px] md:bg-white outline-none pl-5 rounded-l-full'
              placeholder='Search'
              type="text" />

          </div>
          <button
            ref={cx.searchButtonRef}
            type='button'
            onClick={handleSearch}
            className={'group w-16 md:h-10 h-[32px] flex justify-center items-center relative md:border md:border-l-0 md:border-gray-300 md:rounded-r-full md:bg-gray-200 md:hover:bg-gray-300 md:transition-all'}>
            <Search size='normal'/>
            { !cx.isMobile &&
          <div className='absolute top-14 bg-gray-500 text-white text-xs px-2 py-2 rounded-[4px] hidden group-hover:block bg-opacity-80'>
            <p>Search</p>
          </div>
            }
          </button>
        </div>
        { cx.isMobile &&
        <div ref={cx.rightDivRef} className='hidden basis-1/12' ></div>
        }
      </div>
      { (cx.isMobile && cx.showSB) &&
        <div className='absolute left-0 right-0 bg-black bg-opacity-30 h-screen'></div>
      }
    </>
  );
};

export default Input;
