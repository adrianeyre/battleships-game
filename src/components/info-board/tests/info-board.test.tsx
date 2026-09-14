import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
  const buildProps = (overrides: Partial<IInfoBoardProps> = {}): IInfoBoardProps => ({
    containerHeight: 800,
    startGame: vi.fn(),
    ...overrides,
  });

  it('Should render the title and the instructions', () => {
    render(<InfoBoard {...buildProps()} />);

    expect(screen.getByText('Battle Ships')).toBeInTheDocument();
    expect(screen.getByText('Rotate')).toBeInTheDocument();
  });

  it('Should keep Play Game disabled until a name is entered', async () => {
    render(<InfoBoard {...buildProps()} />);

    const button = screen.getByRole('button', { name: 'Play Game' });
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox'), 'Adrian');

    expect(button).toBeEnabled();
  });

  it('Should start the game with the entered name', async () => {
    const startGame = vi.fn();

    render(<InfoBoard {...buildProps({ startGame })} />);

    await userEvent.type(screen.getByRole('textbox'), 'Adrian');
    await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

    expect(startGame).toHaveBeenCalledWith('Adrian');
  });
});
