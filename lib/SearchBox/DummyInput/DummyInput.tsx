import React from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Clear } from '../Svg';

const DummyInput: React.FC = () => {
  const ctx = useSearchBoxContext();

  const handleDummyInput = (): void => {
    ctx.setShowSB(true);
    ctx.refs.input.current?.focus();
  };

  return (
    <div
      ref={ctx.refs.dummyInput}
      onClick={handleDummyInput}
      role='dummy-input'
      className='w-full'>
      <div className='w-full h-8 bg-gray-100 dark:dark-bg-secondary rounded-lg items-center px-1.5 flex justify-between'>
        <span className='truncate text-sm text-gray-500 dark:text-white'>{ctx.tempVal}</span>
        <div className='w-6 h-6'>
          <Clear/>
        </div>
      </div>
    </div>
  );
};

export default DummyInput;
