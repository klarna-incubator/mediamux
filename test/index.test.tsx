import './matchMedia.mock.js'; // Must be imported before the tested file
import * as React from 'react';
import { render } from '@testing-library/react';
import { useMediamux, MediamuxProvider } from '../src';

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
      <MediamuxProvider>
        <TestComponent />
      </MediamuxProvider>
    );

    expect(queryByTestId('small')).toBeTruthy();
  });

  it('renders first argument if matching first media-query', () => {
    (window.matchMedia as any).mockImplementationOnce((query: any) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { queryByTestId } = render(
      <MediamuxProvider>
        <TestComponent />
      </MediamuxProvider>
    );

    expect(queryByTestId('medium')).toBeTruthy();
  });

  it('renders second argument if matching first and second media-query', () => {
    (window.matchMedia as any)
      .mockImplementationOnce((query: any) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      .mockImplementationOnce((query: any) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

    const { queryByTestId } = render(
      <MediamuxProvider>
        <TestComponent />
      </MediamuxProvider>
    );

    expect(queryByTestId('large')).toBeTruthy();
  });

  it('picks last argument if active mediaquery index > argument array', () => {
    (window.matchMedia as any)
      .mockImplementationOnce((query: any) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      .mockImplementationOnce((query: any) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

    function OnlyTwoItems() {
      const mmx = useMediamux();
      return (
        <div>
          {mmx([<div data-testid="small" />, <div data-testid="medium" />])}
        </div>
      );
    }

    const { queryByTestId } = render(
      <MediamuxProvider>
        <OnlyTwoItems />
      </MediamuxProvider>
    );

    expect(queryByTestId('medium')).toBeTruthy();
  });
});
