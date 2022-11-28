import React, { useState } from 'react';
import SearchBox from '../lib';
import { ISearchResult } from '../lib/types';
const App: React.FC = () => {
  const [results] = useState(
    [
      { id: 0, title: 'Javascript tutorials' },
      { id: 1, title: 'Javascript tutorials 2' },
      { id: 2, title: 'Java tutorials' },
      { id: 3, title: 'Kotlin tutorials' },
      { id: 4, title: 'Swift tutorials' },
      { id: 5, title: 'Dart tutorials' },
      { id: 6, title: 'Python tutorials' },
      { id: 7, title: 'Rust tutorials' },
      { id: 8, title: 'C# tutorials' },
      { id: 9, title: 'Perl tutorials' },
      { id: 10, title: 'C++ tutorials' }
    ]
  );

  const handleOnChange = (): void => {
  };

  const handleOnClick = (): void => {

  };

  return (
    <div className='h-12 w-full bg-white flex justify-evenly items-center'>
      <div className='md:w-3/12 w-2/12  flex justify-center'>
        <div className='w-full h-10 rounded-full bg-gray-200'></div>
      </div>
      <div className='md:w-[500px] w-6/12'>
        <SearchBox
          onChange={handleOnChange}
          onClick={handleOnClick}
          results={results}
        />
      </div>
      <div className='md:w-3/12 w-2/12 flex justify-end'>
        <div className='w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center'>
          <img src="/src/assets/user.png" className='w-5 h-5 opacity-50' alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default App;
