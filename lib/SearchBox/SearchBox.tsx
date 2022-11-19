import React from 'react';
import { Input } from './Input';
import { Results } from './Results';

const SearchBox = (): JSX.Element => {
  return (
    <div>
      <Input/>
      <Results/>
    </div>
  );
};

export default SearchBox;
