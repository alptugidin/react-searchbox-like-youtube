import React from 'react';
import { useSearchBoxContext } from '../SearchBox';
import { Clear } from '../Svg';

const DummyInput: React.FC = () => {
  const ctx = useSearchBoxContext();

  const handleMockInput = (): void => {
    ctx.setShowSB(true);
    ctx.inputRef.current?.focus();
  };

  return (
    <div
      ref={ctx.dummyInputRef}
      onClick={handleMockInput}
      className='w-full'>
      <div className='w-full h-8 bg-gray-100 rounded-lg items-center px-1.5 flex justify-between'>
        <span className='truncate text-sm text-gray-500'>{ctx.tempVal}</span>
        <div className='w-6 h-6'>
          <Clear/>
        </div>
      </div>
    </div>
  );
};

export default DummyInput;
