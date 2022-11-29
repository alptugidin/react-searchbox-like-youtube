import React from 'react';
import jest from 'jest-mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';
import { ISearchResult } from '../lib/types';

const results = [
  { id: 1, title: 'Javascript tutorials' },
  { id: 2, title: 'Java tutorials' },
  { id: 3, title: 'Kotlin tutorials' },
  { id: 4, title: 'Swift tutorials' },
  { id: 5, title: 'Dart tutorials' },
  { id: 6, title: 'Python tutorials' },
  { id: 7, title: 'Rust tutorials' }
];

const searchTerms = ['javascript', 'kotlin', 'rust', 'avascr', 'otl'];
const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
const mockFn = jest.fn();

beforeEach(() => render(
  <SearchBox
    results={results}
    onChange={mockFn}
    onClick={mockFn}
  />)
);

it('should matched that the search term and the results', async () => {
// const input = screen.getByPlaceholderText('Search something');
// await userEvent.type(input, randomTerm);
// const ul = screen.getByRole('listResults');
// const regexpToHave = new RegExp(`(${randomTerm})`, 'gi');
// expect(ul).toHaveTextContent(regexpToHave);
});
