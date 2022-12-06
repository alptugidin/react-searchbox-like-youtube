import React from 'react';
import jest from 'jest-mock';
import { renderHook } from '@testing-library/react';
import useIsMobile from '../lib/hooks/useIsMobile';
;
const mockFn = jest.fn();
it('should be true when the screen width is less than 768', () => {
  window.innerWidth = 700;
  const { result } = renderHook(() => useIsMobile());
  expect(result.current.isMobile).toBe(true);
});

it('should be false when the screen width is greater than 768', () => {
  window.innerWidth = 1000;
  const { result } = renderHook(() => useIsMobile());
  expect(result.current.isMobile).toBe(false);
});
