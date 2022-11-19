import React from 'react';
import SearchBox from '../lib';

const App = (): JSX.Element => {
  return (
    <div className='flex justify-center'>
      <div className='w-[500px] mt-20'>
        <SearchBox/>
      </div>
    </div>
  );
};

export default App;
