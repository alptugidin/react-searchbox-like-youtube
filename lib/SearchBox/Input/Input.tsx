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
    setTimeout(() => ctx.inputRef.current?.focus(), 0.1);
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
      { ctx.tempVal.length > 0 &&
      <button
        onClick={handleClear}
        className='input-clear-button'>
        <div className='input-clear-button-svg'>
          <Clear />
        </div>
      </button>
      }
      <button
        ref={ctx.clearButtonRef}
        className='input-search-button'>
        <Search size='normal'/>
      </button>
    </div>
  );
};

export default Input;
