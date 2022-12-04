import React, { createContext, useDeferredValue } from 'react';
import jest from 'jest-mock';
import { queryByPlaceholderText, queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';
import { ISearchBoxContext, ISearchResult } from '../lib/types';
import { Input } from '../lib/SearchBox/Input';

test('handleClear', () => {
  const SearchBoxContext = createContext<ISearchBoxContext>({} as ISearchBoxContext);
});
