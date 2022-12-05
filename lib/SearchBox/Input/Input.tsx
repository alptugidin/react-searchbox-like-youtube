import React, { FC, useEffect, useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import { filterCondition } from '../../utils/filterCondition';
import { useSearchBoxContext } from '../SearchBox';
import { Back, Clear, Search } from '../Svg';

const Input: FC = () => {
  const ctx = useSearchBoxContext();
  const { isMobile } = useIsMobile();
  const [showPopup, setShowPopup] = useState(false);

  const handleFocus = (): void => {
    ctx.setShowLeftSearchSvg(true);
    ctx.refs.respBg.current?.classList.remove('hidden');
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return undefined;
    ctx.setValue(e.target.value);
    ctx.setTempVal(e.target.value);
    ctx.onChange(e.target.value);
    ctx.setArr(ctx.results?.slice(0, 10).filter(item => filterCondition(item, e.target.value)));
  };

  const handleClear = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.refs.input.current?.focus();
  };

  const handleSearch = (): void => {
    ctx.setTempVal(ctx.value);
    ctx.setValue('');
    ctx.setArr(undefined);
    ctx.setShowLeftSearchSvg(false);
  };

  const handleBack = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.setShowSB(false);
    ctx.setShowDummyInput(false);
    ctx.refs.respSbButton.current?.classList.remove('hidden');
  };

  const handleSearchHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    switch (e.type) {
    case 'mouseenter':
      setShowPopup(true);
      break;
    case 'mouseleave':
      setShowPopup(false);
      break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace' && ctx.tempVal.length < 1) {
      ctx.setArr(undefined);
      ctx.setActive(-1);
    }
    if (ctx.arr !== undefined) {
      switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (ctx.active < ctx.arr.length - 1) {
          ctx.setActive(ctx.active + 1);
          ctx.setTempVal(ctx.arr[ctx.active + 1].title);
        } else {
          ctx.setActive(0);
          ctx.setTempVal(ctx.arr[0].title);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (ctx.active > 0) {
          ctx.setActive(ctx.active - 1);
          ctx.setTempVal(ctx.arr[ctx.active - 1].title);
        } else {
          ctx.setActive(ctx.arr.length - 1);
          ctx.setTempVal(ctx.arr[ctx.arr.length - 1].title);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (ctx.active > -1) {
          ctx.setArr(undefined);
          ctx.setTempVal(ctx.arr[ctx.active].title);
          ctx.setValue(ctx.arr[ctx.active].title);
          ctx.setActive(-1);
          ctx.setShowLeftSearchSvg(false);
          ctx.refs.input.current?.blur();
          ctx.onSearch(ctx.arr[ctx.active]);
        } else {
          ctx.setTempVal(ctx.value);
          ctx.setValue('');
          ctx.setShowLeftSearchSvg(false);
          ctx.refs.input.current?.blur();
          ctx.onSearch(ctx.value);
        }
        break;
      }
    }
  };

  return (
    <div className='relative flex w-full'>
      {isMobile
        ? (
          <button
            type='button'
            onClick={handleBack}
            role='back-button'
            className='input-back-button'>
            <Back/>
          </button>
        )
        : (
          ctx.showLeftSearchSvg &&
          <div
            ref={ctx.refs.inputSearchIcon}
            role='inputSearchIcon'
            className='input-search-icon'>
            <Search size='mini' />
            <div className='absolute w-[4px] h-[34px] -right-[1px] bottom-0 md:bg-white md:dark:dark-bg'></div>
          </div>
        )
      }
      <div className={`input-comp ${ctx.tempVal.length > 0 ? 'input-comp-resp' : ''}`}>
        <input
          type="text"
          ref={ctx.refs.input}
          onFocus={handleFocus}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          value={ctx.tempVal}
          placeholder='Search something'
          className={`input ${ctx.showLeftSearchSvg ? 'input-focus' : ''}`}
        />
        <button
          onClick={handleClear}
          role='clear'
          ref={ctx.refs.clearButton}
          className={`input-clear-button ${ctx.tempVal.length > 0 ? '' : 'hidden'}`}>
          <div className='input-clear-button-svg'>
            <Clear/>
          </div>
        </button>

        <button
          role='search-button'
          onClick={handleSearch}
          onMouseEnter={handleSearchHover}
          onMouseLeave={handleSearchHover}
          className='input-search-button'>
          <Search size='normal'/>

          {showPopup && !isMobile &&
            <div
              role='popup'
              className='search-popup'>
              <p>Search!</p>
            </div>
          }
        </button>
      </div>
      {isMobile &&
        <div ref={ctx.refs.respBg} className='resp-background' role='responsive-bg'/>
      }

    </div>
  );
};

export default Input;
