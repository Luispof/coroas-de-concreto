import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Home from './page';

afterEach(cleanup);

describe('home page', () => {
  it('renders the project identity in the main landmark', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    const heading = screen.getByRole('heading', { level: 1, name: 'Coroas de Concreto' });
    expect(main.contains(heading)).toBe(true);
    expect(screen.getByText('Universo de RPG cinematográfico.')).toBeDefined();
  });
});
