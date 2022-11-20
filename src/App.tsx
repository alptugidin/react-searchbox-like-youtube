import React from 'react';
import SearchBox from '../lib';
const App: React.FC = () => {
  return (
    <div className='h-14 w-full bg-white flex justify-evenly items-center'>
      <div className='w-3/12 flex justify-center'>
        <div className='w-full h-10 rounded-full bg-gray-200'></div>
      </div>
      <div className='md:w-[500px] w-6/12'>
        <SearchBox/>
      </div>
      <div className='w-2/12 flex justify-end'>
        <div className='w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center'>
          <img src="/src/assets/user.png" className='w-5 h-5 opacity-50' alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default App;
