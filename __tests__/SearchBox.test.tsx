import React from 'react';
import jest from 'jest-mock';
import { queryByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';
const mockFn = jest.fn();
it('shoud render on the page', () => {
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const input = screen.getByPlaceholderText('Search something');
  expect(input).toBeInTheDocument();
});

it('should render the hidden search svg when input has focused', () => {
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const input = screen.getByPlaceholderText('Search something');
  const svg = screen.getByRole('leftSearchSVG');
  expect(svg).toHaveStyle('display: block');
  input.focus();
  expect(svg).not.toHaveStyle('display: none');
});

it('should be visible when the search button has clicked in responsive mode', async () => {
  window.innerWidth = 700;
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const searchBox = document.getElementById('sbly');
  const searchButton = screen.getByRole('SearchButton');
  const searchButtonResp = screen.getByRole('responsive-search-button');
  expect(searchBox?.classList.contains('!hidden')).toBe(true);
  await userEvent.click(searchButtonResp);
  expect(searchBox?.classList.contains('!hidden')).toBe(false);
});
