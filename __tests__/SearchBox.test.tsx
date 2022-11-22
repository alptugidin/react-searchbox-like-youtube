import React from 'react';
import mediaQuery from 'css-mediaquery';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../lib';

let table: HTMLDivElement;

it('shoud render on the page', () => {
  render(<SearchBox/>);
  const input = screen.getByPlaceholderText('Search something');
  expect(input).toBeInTheDocument();
});

it('should render to hidden search svg when input has focused', () => {
  render(<SearchBox/>);
  const input = screen.getByPlaceholderText('Search something');
  const svg = screen.getByRole('leftSearchSVG');
  expect(svg).toHaveStyle('display: block');
  input.focus();
  expect(svg).not.toHaveStyle('display: none');
});

it('should render the hidden `Saerch` modal when hovering on Search Button ', async () => {
  render(<SearchBox/>);
  const searchButton = screen.getByRole('SearchButton');
  const searchModal = screen.getByRole('searchModal');
  expect(searchModal).toHaveClass('hidden');
  await userEvent.hover(searchButton);
  expect(searchModal).not.toHaveClass('hidden');
});

it('should render properly with responsive classes when clicked search button', async () => {
  window.innerWidth = 700;
  render(<SearchBox/>);
  const searchBox = document.getElementById('sbly') as HTMLDivElement;
  const searchButton = screen.getByRole('SearchButton');
  // const backButton = screen.getByRole('BackButton');
  const input = screen.getByPlaceholderText('Search something');
});
