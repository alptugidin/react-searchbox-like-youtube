import React, { useEffect, useState } from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Back, Clear, Search } from '../Svg';

const Input = (): JSX.Element => {
  const ctx = useSearchBoxContext();
  const [showPopup, setShowPopup] = useState(false);
  const handleFocus = (): void => {
    ctx.setShowLeftSearchSvg(true);
    ctx.respBgRef.current?.classList.remove('hidden');
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return undefined;
    ctx.setValue(e.target.value);
    ctx.setTempVal(e.target.value);
    ctx.onChange(e.target.value);
  };

  const handleClear = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.inputRef.current?.focus();
  };

  const handleSearch = (): void => {
    // add onSearch
  };

  const handleBack = (): void => {
    ctx.setValue('');
    ctx.setTempVal('');
    ctx.setShowSB(false);
    ctx.setShowDummyInput(false);
    ctx.respSbButton.current?.classList.remove('hidden');
  };

  const handleSearchHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    switch (e.type) {
    case 'mouseenter':
      setShowPopup(true);
      ctx.searchButtonRef.current?.classList.add('foo');
      break;
    case 'mouseleave':
      setShowPopup(false);
      break;
    }
  };

  return (
    <div className='relative flex w-full'>
      {ctx.isMobile
        ? (
          <button
            type='button'
            onClick={handleBack}
            ref={ctx.backButtonRef}
            role='back-button'
            className='input-back-button'>
            <Back/>
          </button>
        )
        : (
          ctx.showLeftSearchSvg &&
                <div
                  ref={ctx.inputSearchIconRef}
                  role='inputSearchIcon'
                  className='input-search-icon'>
                  <Search size='mini' />
                </div>
        )
      }
      <div className={`input-comp ${ctx.tempVal.length > 0 ? 'input-comp-resp' : ''}`}>
        <input
          type="text"
          ref={ctx.inputRef}
          onFocus={handleFocus}
          onChange={handleOnChange}
          value={ctx.tempVal}
          placeholder='Search something'
          className='input'
        />
        <button
          onClick={handleClear}
          ref={ctx.clearButtonRef}
          className={`input-clear-button ${ctx.tempVal.length > 0 ? '' : 'hidden'}`}>
          <div className='input-clear-button-svg'>
            <Clear/>
          </div>
        </button>

        <button
          ref={ctx.searchButtonRef}
          role='SearchButton'
          onClick={handleSearch}
          onMouseEnter={handleSearchHover}
          onMouseLeave={handleSearchHover}
          className='input-search-button'>
          <Search size='normal'/>

          {showPopup && !ctx.isMobile &&
                <div
                  ref={ctx.modalRef}
                  role='popup'
                  className='search-popup'>
                  <p>Search!</p>
                </div>
          }
        </button>
      </div>
      {ctx.isMobile &&
            <div ref={ctx.respBgRef} className='resp-background' role='responsive-bg'/>
      }

    </div>
  );
};

export default Input;
