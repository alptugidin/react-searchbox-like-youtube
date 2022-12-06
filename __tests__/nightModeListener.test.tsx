import React from 'react';
import jest from 'jest-mock';
import { renderHook } from '@testing-library/react';
import nightModeListener from '../lib/utils/nightModeListener';

it('should add the dark class to documentElement when the darkMode is true', () => {
  const nightMode = true;
  renderHook(() => nightModeListener(nightMode));
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

it('should remove the dark class to documentElement when the darkMode is false', () => {
  const nightMode = false;
  renderHook(() => nightModeListener(nightMode));
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});
