/* eslint-disable import/export */

import { render } from '@testing-library/react';

// eslint-disable-next-line no-unused-vars
const customRender = (ui, options = {}) =>

  render(ui, {

    // wrap provider(s) here if needed

    wrapper: ({ children }) => children,

    ...options

  });

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render export

export { customRender as render };
