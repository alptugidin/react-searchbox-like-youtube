import React, { createContext, useDeferredValue } from 'react';
import jest from 'jest-mock';
import { queryByPlaceholderText, queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';

const mockFn = jest.fn();

it('should render the focused searchbox when clicked in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  await userEvent.type(screen.getByPlaceholderText('Search something'), 'foo');
  await userEvent.click(screen.getByRole('search-button'));
  expect(queryByRole(container, 'searchbox')).toEqual(null);
  await userEvent.click(screen.getByRole('dummy-input'));
  expect(queryByRole(container, 'searchbox')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search something')).toHaveFocus();
});
