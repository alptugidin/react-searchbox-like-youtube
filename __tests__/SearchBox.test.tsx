import React from 'react';
import jest from 'jest-mock';
import { queryByRole, render, screen } from '@testing-library/react';
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

it('should render to hidden search svg when input has focused', () => {
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

it('should render the hidden `Saerch` modal when hovering on Search Button ', async () => {
  render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const searchButton = screen.getByRole('SearchButton');
  const searchModal = screen.getByRole('searchModal');
  expect(searchModal).toHaveClass('hidden');
  await userEvent.hover(searchButton);
  expect(searchModal).not.toHaveClass('hidden');
});

it('should render the input and back button, when clicked search button in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const searchButton = screen.getByRole('SearchButton');
  const input = screen.getByPlaceholderText('Search something');
  expect(input.parentElement).toHaveClass('hidden');
  expect(queryByRole(container, 'BackButton')).toEqual(null);
  await userEvent.click(searchButton);
  expect(input.parentElement).not.toHaveClass('hidden');
  expect(queryByRole(container, 'BackButton')).not.toEqual(null);
});

it('should applied the background, when clicked search button in responsive mode', async () => {
  window.innerWidth = 700;
  const { container } = render(
    <SearchBox
      results={[]}
      onChange={mockFn}
      onClick={mockFn}
    />);
  const searchButton = screen.getByRole('SearchButton');
  expect(queryByRole(container, 'mobileBackground')).toEqual(null);
  await userEvent.click(searchButton);
  expect(queryByRole(container, 'mobileBackground')).toBeVisible();
});
