import { render } from '@testing-library/react';
import { act } from 'react';
import CompHero from './components/CompHero copy.js';

describe('CompHero', () => {
  test('alphaTrigger is not updated unless alphaValues.solve has a valid value', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    act(() => {
      render(<CompHero />);
    });

    // Initially, alphaValues.solve is null, so `alphaTrigger` shouldn't toggle
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('animation state:')
    );

    // Simulate alphaValues.solve getting updated
    act(() => {
      // Manually trigger state updates if needed by firing events or calling mocks
    });

    // Check logs or state updates when `alphaValues.solve` becomes valid
    consoleSpy.mockRestore();
  });
});
jest.mock('react', () => {
    const actualReact = jest.requireActual('react');
    return {
      ...actualReact,
      useRef: jest.fn(() => ({ current: null })), // Simulate ref as null
    };
  });
  
  

describe('CompHero', () => {
    test('first useEffect does not run when ref is null', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
      render(<CompHero />);
  
      // Ensure the log indicating useEffect logic is skipped when ref is null
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('animation state:')
      );
  
      consoleSpy.mockRestore();
    });
  });