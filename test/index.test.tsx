import './matchMedia.mock'; // Must be imported before the tested file
import * as React from 'react';
import { render } from '@testing-library/react';
import { useMediamux, MediamuxProvider } from '../src';

const theme = {
  breakpoints: ['768px', '1200px'],
};

function TestComponent() {
  const mmx = useMediamux();
  return (
    <div>
      {mmx([
        <div data-testid="small" />,
        <div data-testid="medium" />,
        <div data-testid="large" />,
      ])}
    </div>
  );
}

describe('it', () => {
  it('renders without crashing', () => {
    const { queryByTestId } = render(
      <MediamuxProvider theme={theme}>
        <TestComponent />
      </MediamuxProvider>
    );

    expect(queryByTestId('small')).toBeTruthy();
  });
});
