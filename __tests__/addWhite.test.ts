import React from 'react';
import jest from 'jest-mock';
import { queryByPlaceholderText, queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import addWhite from '../lib/utils/addWhite';

it('should make the given color as lighter as the given value', () => {
  const givenColor = '#000000'; // rgb(0, 0, 0)
  const randomRatio = Math.floor(Math.random() * 255);
  const { lightDark } = addWhite(givenColor, randomRatio);
  expect(lightDark.replaceAll('\n', '').replaceAll(' ', '')).toEqual(`rgb(${randomRatio},${randomRatio},${randomRatio})`);
});

test('when the given value is not hex color, every color should be undefined', () => {
  const givenColor = '#x0x0x0'; // rgb(0, 0, 0)
  const randomRatio = Math.floor(Math.random() * 255);
  const { lightDark } = addWhite(givenColor, randomRatio);
  expect(lightDark.replaceAll('\n', '').replaceAll(' ', '')).toEqual('rgb(undefined,undefined,undefined)');
});
