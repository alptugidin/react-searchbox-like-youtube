import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Back, Clear, Search } from '../Svg';
const Input = (): JSX.Element => {
  const ctx = useSearchBoxContext();
  const handleFocus = (): void => {
    ctx.inputSearchIconRef.current?.classList.remove('!hidden');
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return undefined;
    ctx.setValue(e.target.value);
    ctx.setTempVal(e.target.value);
  };

  const handleClear = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.inputRef.current?.focus();
  };

  return (
    <div className='input-comp'>
      <div ref={ctx.inputSearchIconRef} className='input-search-icon !hidden'>
        <Search size='mini' />
      </div>
      <input
        type="text"
        ref={ctx.inputRef}
        onFocus={handleFocus}
        onChange={handleOnChange}
        value={ctx.tempVal}
        placeholder='Search'
        className='input'
      />
      <button
        onClick={handleClear}
        ref={ctx.clearButtonRef}
        className={`input-clear-button ${ctx.tempVal.length > 0 ? '' : 'hidden'}`}>
        <div className='input-clear-button-svg'>
          <Clear />
        </div>
      </button>
      <button
        ref={ctx.searchButtonRef}
        className='input-search-button group'>
        <Search size='normal'/>
        <div
          ref={ctx.modalRef}
          role='searchModal'
          className='search-popup group-hover:block'>
          <p>Search!</p>
        </div>
      </button>
    </div>
  );
};

export default Input;
