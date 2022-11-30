import NightModeButton from './components/NightModeButton';
import React, { useState } from 'react';
import SearchBox from '../lib';
import { ISearchResult } from '../lib/types';
const App: React.FC = () => {
  const [nightMode, setNightMode] = useState(false);
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

  const handleOnChange = (onChangeData: string): void => {
  };

  const handleOnClick = (onClickData: ISearchResult): void => {
  };

  return (
    <div className='h-12 w-full  flex justify-evenly items-center'>
      <div className='md:w-3/12 w-2/12 flex justify-start'>
        <div className='md:w-1/2 w-full h-10 rounded-full bg-gradient-to-r from-red-700 to-red-400'></div>
      </div>
      <div className='md:w-[500px] w-6/12'>
        <SearchBox
          onChange={handleOnChange}
          onClick={handleOnClick}
          results={results}
        />
      </div>
      <div className='md:w-3/12 w-2/12 flex justify-end'>
        <NightModeButton {...{ setNightMode, nightMode }}/>
      </div>
    </div>
  );
};

export default App;
