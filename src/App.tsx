import NightModeButton from './components/NightModeButton';
import React, { useEffect, useState } from 'react';
import SearchBox from '../lib';
import { ISearchResult } from '../lib/types';
import { useFetch } from './hooks/useFetch';
const App: React.FC = () => {
  const [query, setQuery] = useState<string>();
  const [nightMode, setNightMode] = useState(false);
  const { asyncResults } = useFetch(query as string);
  const [results] = useState<ISearchResult[]>(
    [
      { id: 0, title: 'Javascript tutorials', href: '/' },
      { id: 1, title: 'Javascript tutorials 2', href: '/' },
      { id: 2, title: 'Java tutorials', href: '/' },
      { id: 3, title: 'Kotlin tutorials', href: '/' },
      { id: 4, title: 'Swift tutorials', href: '/' },
      { id: 5, title: 'Dart tutorials', href: '/' },
      { id: 6, title: 'Python tutorials', href: '/' },
      { id: 7, title: 'Rust tutorials', href: '/' },
      { id: 8, title: 'C# tutorials', href: '/' },
      { id: 9, title: 'Perl tutorials', href: '/' },
      { id: 10, title: 'C++ tutorials', href: '/' }
    ]
  );

  const handleOnChange = (onChangeData: string): void => {
    setQuery(onChangeData);
  };

  const handleOnClick = (onClickData: ISearchResult): void => {
    console.log(onClickData);
  };

  const handleOnSearch = (onSearchData: any): void => {
    console.log(onSearchData);
  };

  return (
    <div className={'h-screen transition-all bg-white dark:bg-[#0f0f0f]'}>
      <div className='w-full flex justify-evenly h-12 items-center'>
        <div className='md:w-3/12 w-2/12 flex justify-start'>
          <div className='md:w-1/2 w-full h-10 rounded-full bg-gradient-to-r from-red-700 to-red-500'></div>
        </div>
        <div className='md:w-[500px] w-6/12'>
          <SearchBox
            onChange={handleOnChange}
            onClick={handleOnClick}
            onSearch={handleOnSearch}
            nightMode={nightMode}
            results={results}
            placeholder='Search tutorials e.g. Javascript'
            sx={{
              lightBg: '#FFFFFF',
              darkBg: '#0F0F0F'
            }}
          />
        </div>
        <div className='md:w-3/12 w-2/12 flex justify-end'>
          <NightModeButton {...{ setNightMode, nightMode }}/>
        </div>
      </div>
    </div>
  );
};

export default App;
