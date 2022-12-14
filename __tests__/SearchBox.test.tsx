import React, { useDeferredValue } from 'react';
import jest from 'jest-mock';
import { queryByPlaceholderText, queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';
import { ISearchResult } from '../lib/types';

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

const searchTerms = ['javascript', 'kotlin', 'rust', 'avascr', 'otl'];
const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
const randomTermRegexp = new RegExp(`(${randomTerm})`, 'gi');
const mockFn = jest.fn();

it('should render on the page', () => {
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  expect(input).toBeInTheDocument();
});

it('should render the hidden search svg when input has focused', async () => {
  window.innerWidth = 1920;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  expect(queryByRole(container, 'inputSearchIcon')).toEqual(null);
  await userEvent.click(input);
  expect(queryByRole(container, 'inputSearchIcon')).toBeVisible();
});

it('should be visible when the search button is clicked in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  expect(queryByPlaceholderText(container, 'Search something')).toEqual(null);
  await userEvent.click(responsiveSearchButton);
  expect(screen.getByPlaceholderText('Search something')).toBeInTheDocument();
});

it('should be removed from the document when back button is clicked in responsive mode', async () => {
  window.innerWidth = 700;
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const backButton = screen.getByRole('back-button');
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  await userEvent.click(backButton);
  expect(responsiveSeachBox).not.toBeInTheDocument();
});

it('should be removed from the document when clicked in outside the search box', async () => {
  window.innerWidth = 700;
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  const outside = screen.getByRole('responsive-bg');
  await userEvent.click(outside);
  expect(responsiveSeachBox).not.toBeInTheDocument();
});

it('should render the hidden search popup when search button is hovered and vice versa', async () => {
  window.innerWidth = 1920;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const searchButton = screen.getByRole('search-button');
  expect(queryByRole(container, 'popup')).toEqual(null);
  await userEvent.hover(searchButton);
  expect(queryByRole(container, 'popup')).not.toEqual(null);
  await userEvent.unhover(searchButton);
  expect(queryByRole(container, 'popup')).toEqual(null);
});

it('should matched that the search term and the results', async () => {
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const input = screen.getByPlaceholderText('Search something');
  await userEvent.type(input, randomTerm);
  const ul = screen.getByRole('search-results');

  expect(ul).toHaveTextContent(randomTermRegexp);
});

it('should remove li-search-icon from document in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(responsiveSeachBox, randomTerm);
  expect(queryByRole(container, 'results-li-icon')).toEqual(null);
});

it('should update value and results when the arrow button is clicked in responsive button', async () => {
  window.innerWidth = 700;
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(responsiveSeachBox, 'javascript');
  const ul = screen.getByRole('search-results');
  const arrowButtons = screen.getAllByRole('arrow-button');
  // results => Javascript tutorials , Javascript tutorials 2
  await userEvent.click(arrowButtons[1]);
  // results =>  Javascript tutorials
  expect(screen.getAllByRole('arrow-button').length).toEqual(1);
});

it('should render the dummy input after selected any of the results in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(responsiveSeachBox, 'javascript');
  const firstResult = screen.getAllByRole('results-text');
  expect(queryByRole(container, 'dummy-input')).not.toBeInTheDocument();
  await userEvent.click(firstResult[0]);
  expect(queryByRole(container, 'dummy-input')).toBeInTheDocument();
});

it('should set dummy input value with selected data in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);
  const responsiveSearchButton = screen.getByRole('responsive-search-button');
  await userEvent.click(responsiveSearchButton);
  const responsiveSeachBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(responsiveSeachBox, randomTerm);
  const firstResult = screen.getAllByRole('results-text');
  await userEvent.click(firstResult[0]);
  const randomTermRegexp = new RegExp(`(${randomTerm})`, 'gi');
  expect(queryByRole(container, 'dummy-input')).toHaveTextContent(randomTermRegexp);
});

test('onChange function ', async () => {
  window.innerWidth = 1920;
  let captureOnChangeData;
  const handleOnChange = (onChangeData: string): void => {
    captureOnChangeData = onChangeData;
  };
  render(
    <SearchBox
      results={results}
      onChange={handleOnChange}
      onClick={mockFn}
      onSearch={mockFn}
      placeholder='Search something'
    />);

  const searchBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(searchBox, randomTerm);
  expect(captureOnChangeData).toEqual(randomTerm);
});

test('onClick function', async () => {
  window.innerWidth = 1920;
  let captureOnClickData;
  const handleOnClick = (onClickData: ISearchResult): void => {
    captureOnClickData = onClickData;
  };
  render(
    <SearchBox
      results={results}
      onChange={mockFn}
      onClick={handleOnClick}
      onSearch={mockFn}
      placeholder='Search something'
    />);

  const searchBox = screen.getByPlaceholderText('Search something');
  await userEvent.type(searchBox, 'kotlin');
  const firstResult = screen.getByRole('results-text');
  await userEvent.click(firstResult);
  expect((captureOnClickData as unknown as ISearchResult).id).toEqual(3);
  expect((captureOnClickData as unknown as ISearchResult).title).toEqual('Kotlin tutorials');
});
