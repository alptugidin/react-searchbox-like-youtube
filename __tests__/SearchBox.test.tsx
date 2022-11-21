import React from 'react';
import { fireEvent, getByPlaceholderText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../lib';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';

beforeEach(() => {
  render(<SearchBox/>);
});

it('shoud render on the page', () => {
  const input = screen.getByPlaceholderText('Search something');
  expect(input).toBeInTheDocument();
});

it('should render to hidden search svg when input has focused', () => {
  const input = screen.getByPlaceholderText('Search something');
  const svg = screen.getByRole('leftSearchSVG');
  expect(svg).toHaveStyle('display: block');
  input.focus();
  expect(svg).not.toHaveStyle('display: none');
});

it('should render the hidden `Saerch` modal when hovering on Search Button ', () => {
  const searchButton = screen.getByRole('SearchButton');
  const searchModal = screen.getByRole('searchModal');
  expect(searchModal).toHaveClass('hidden');
  fireEvent.mouseOver(searchButton);
  expect(searchModal).not.toHaveClass('hidden');
});
