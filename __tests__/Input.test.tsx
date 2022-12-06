import React, { createContext, useDeferredValue } from 'react';
import jest from 'jest-mock';
import { queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';

const results = [
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
];

const mockFn = jest.fn();
test('handleClear', async () => {
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, 'javascript');
  expect(input).toHaveValue('javascript');
  const clear = screen.getByRole('clear');
  await userEvent.click(clear);
  expect(input).toHaveValue('');
});

test('handleSearch', async () => {
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
    />);
  const input = screen.getByPlaceholderText('Search something');
  const searchButton = screen.getByRole('search-button');
  await userEvent.type(input, 'foo');
  expect(queryByRole(container, 'inputSearchIcon')).toBeVisible();
  await userEvent.click(searchButton);
  expect(queryByRole(container, 'inputSearchIcon')).toEqual(null);
  expect(input).toHaveValue('foo');
});

test('handleKeyDown', async () => {
  const { container } = render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, 'tut');
  // case ArrowDown (twice)
  await userEvent.keyboard('{arrowdown>2}');
  const ul = screen.getByRole('search-results');
  expect(ul.childNodes[1]).toHaveClass('bg-[#00000010]');
  // case ArrowUp (once)
  await userEvent.keyboard('{arrowup}');
  expect(ul.childNodes[1]).not.toHaveClass('bg-[#00000010]');
  expect(ul.childNodes[0]).toHaveClass('bg-[#00000010]');
  // case BackSpace
  await userEvent.type(input, '{backspace>30}');
  expect(input).toHaveValue('');
  // Enter
  await userEvent.type(input, 'javascript');
  await userEvent.keyboard('{arrowdown>2}');
  const textContent = ul.childNodes[1].textContent;
  await userEvent.keyboard('{enter}');
  expect(queryByRole(container, 'search-results')).toEqual(null);
  expect(input).toHaveValue(textContent);
  // Enter test with random search term like 'foo'
  await userEvent.click(screen.getByRole('clear'));
  await userEvent.type(input, 'foo');
  await userEvent.keyboard('{enter}');
  expect(input).toHaveValue('foo');
});

it('should return to first li element when press arrowDown in the last li element', async () => {
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, 'javascript');
  const ul = screen.getByRole('search-results');
  await userEvent.keyboard('{arrowdown>2}');
  expect(ul.childNodes[1]).toHaveClass('bg-[#00000010]');
  await userEvent.keyboard('{arrowdown}');
  expect(ul.childNodes[1]).not.toHaveClass('bg-[#00000010]');
  expect(ul.childNodes[0]).toHaveClass('bg-[#00000010]');
});

it('should return to last li element when press arrowUp in the first li element', async () => {
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, 'javascript');
  const ul = screen.getByRole('search-results');
  await userEvent.keyboard('{arrowup}');
  expect(ul.childNodes[0]).not.toHaveClass('bg-[#00000010]');
  expect(ul.childNodes[1]).toHaveClass('bg-[#00000010]');
});

it('should not update input value if first value is space', async () => {
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, ' ');
  expect(input).toHaveValue('');
});
