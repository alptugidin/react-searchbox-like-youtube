import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Back, ClearSVG, Search } from '../Svg';
const Input = (): JSX.Element => {
  const ctx = useSearchBoxContext();

  const handleSearch = (): void => {
    if (ctx.isMobile) {
      const setClasses = new Promise((resolve, reject) => {
        ctx.setShowSB(true);
        ctx.mainRef.current?.classList.add('!absolute', 'left-0', 'right-0', 'w-full', 'top-0', 'bg-white');
        ctx.topRef.current?.classList.add('custom-box-shadow');
        ctx.topRef.current?.classList.remove('justify-end');
        ctx.inputRef.current?.classList.add('bg-gray-100');
        ctx.searchButtonRef.current?.classList.add('bg-gray-100', 'rounded-r-full');
        ctx.backButtonRef.current?.classList.remove('hidden');
        ctx.backButtonRef.current?.classList.add('flex');
        ctx.rightDivRef.current?.classList.remove('hidden');
        ctx.middleDivRef.current?.classList.add('basis-9/12');
        resolve(true);
      });
      void setClasses.then(() => ctx.inputRef.current?.focus());
    }
    if (ctx.isMobile) {
      ctx.boxRef.current?.classList.remove('hidden');
    }
  };

  const handleBack = (): void => {
    ctx.setBlurSB();
    ctx.setTempVal('');
    ctx.boxRef.current?.classList.add('hidden');
  };

  const handleClear = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.inputRef.current?.focus();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return undefined;
    ctx.setValue(e.target.value);
    ctx.setTempVal(e.target.value);
  };

  const handleBoxFocus = (): void => {
    ctx.leftSvgRef.current?.classList.remove('md:hidden');
    if (!ctx.isMobile) {
      ctx.boxRef.current?.classList.add('rounded-l-none', '!border-blue-800');
      ctx.inputRef.current?.classList.add('shadow-inner');
      ctx.leftSvgRef.current?.classList.add('shadow-inner');
    }
  };

  const handleBoxBlur = (): void => {
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (!ctx.isMobile) {
      switch (e.type) {
      case 'mouseenter':
        ctx.modalRef.current?.classList.remove('hidden');
        break;
      case 'mouseleave':
        ctx.modalRef.current?.classList.add('hidden');
        break;
      }
    }
  };

  useEffect(() => {
    if (!ctx.isMobile) {
      ctx.setShowSB(true);
    } else {
      ctx.setShowSB(false);
    }
  }, [ctx.isMobile]);

  return (
    <>
      <div ref={ctx.topRef} className='relative md:block flex justify-end md:py-0 py-2'>
        {(ctx.isMobile && ctx.showSB) &&
          <button
            type='button'
            onClick={handleBack}
            ref={ctx.backButtonRef}
            role='BackButton'
            className='basis-1/12 flex justify-center items-center'>
            <Back />
          </button>
        }
        <div ref={ctx.middleDivRef} className={`flex ${(ctx.value.length > 0 && ctx.isMobile)
          ? 'basis-11/12 mr-2'
          : 'basis-10/12 justify-end'}`}>
          <div
            ref={ctx.boxRef}
            className={'w-full rounded-l-full md:border md:border-gray-300 relative md:block hidden'}>
            {!ctx.isMobile && (
              <div
                ref={ctx.leftSvgRef}
                id='leftSearchSVG'
                role='leftSearchSVG'
                className='w-12 absolute -left-7 -top-[1px] h-[40px] flex justify-center items-center bg-white border border-blue-800 border-r-0 rounded-l-full md:hidden'>
                <div className='h-[34px] bottom-0 w-1 bg-white absolute -right-0'></div>
                <Search size='mini' />
              </div>
            )}
            <input
              ref={ctx.inputRef}
              className='w-full md:h-[38px] h-[32px] md:bg-white  outline-none pl-5 rounded-l-full pr-8 md:pb-1 pb-0.5'
              onChange={handleOnChange}
              onFocus={handleBoxFocus}
              onBlur={handleBoxBlur}
              value={ctx.tempVal}
              placeholder='Search something'
              type="text" />
            <button
              type='button'
              onClick={handleClear}
              className={`w-8 h-8 absolute md:top-[3px] top-0 md:right-1 right-0 rounded-full hover:bg-black hover:bg-opacity-10 p-1 cursor-pointer 
              ${ctx.tempVal.length > 0 ? 'block' : 'hidden'}`}
            >
              <ClearSVG />
            </button>
          </div>
          <button
            ref={ctx.searchButtonRef}
            onMouseEnter={e => handleButtonHover(e)}
            onMouseLeave={e => handleButtonHover(e)}
            type='button'
            role='SearchButton'
            onClick={handleSearch}
            className={'w-16 md:h-10 h-[32px] flex justify-center items-center relative md:border md:border-l-0 md:border-gray-300 md:rounded-r-full md:bg-gray-100 md:hover:bg-gray-200 md:transition-all'}>
            <Search size='normal' />
            {!ctx.isMobile &&
              <div
                ref={ctx.modalRef}
                role='searchModal'
                className='absolute top-14 bg-gray-500 text-white text-xs px-2 py-2 rounded-[4px] hidden bg-opacity-80'>
                <p>Search!</p>
              </div>
            }
          </button>
        </div>
      </div>
      {(ctx.isMobile && ctx.showSB) &&
        <div
          role='mobileBackground'
          onClick={() => ctx.setBlurSB()}
          className='absolute left-0 right-0 bg-black bg-opacity-30 h-screen'></div>
      }
    </>
  );
};

export default Input;
