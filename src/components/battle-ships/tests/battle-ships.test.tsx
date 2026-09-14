import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import BattleShips from '../battle-ships';
import IBattleShipsProps from '../interfaces/battle-ships-props';

// The game opens a socket to the multiplayer server as soon as it starts, so
// the transport is stubbed rather than dialled.
const emit = vi.fn();

vi.mock('socket.io-client', () => ({
  io: () => ({ on: vi.fn(), emit: (...args: unknown[]) => emit(...args) }),
}));

describe('Battle Ships', () => {
  const defaultProps: IBattleShipsProps = {};

  beforeEach(() => {
    emit.mockClear();
    vi.stubEnv('VITE_SERVER', 'http://localhost:4000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const startGame = async () => {
    await userEvent.type(screen.getByRole('textbox'), 'Adrian');
    await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));
  };

  it('Should open on the info board rather than a board in play', () => {
    const { container } = render(<BattleShips {...defaultProps} />);

    expect(container.querySelector('.info-board')).toBeInTheDocument();
    expect(container.querySelector('.play-area')).not.toBeInTheDocument();
  });

  it('Should swap the info board for two 10x10 boards once the game starts', async () => {
    const { container } = render(<BattleShips {...defaultProps} />);

    await startGame();

    expect(container.querySelector('.info-board')).not.toBeInTheDocument();
    expect(container.querySelector('.play-area')).toBeInTheDocument();
    // 100 squares for the player, 100 for the opponent; the turn marker starts
    // hidden and so renders no image.
    expect(screen.getAllByAltText('sprite')).toHaveLength(200);
  });

  it('Should announce the player to the server on starting a game', async () => {
    render(<BattleShips {...defaultProps} />);

    await startGame();

    expect(emit).toHaveBeenCalledWith(
      'battle-ships-data',
      expect.objectContaining({ name: 'Adrian', message: 'Adrian has joined the game' }),
    );
  });

  it('Should show the game status panel once in play', async () => {
    render(<BattleShips {...defaultProps} />);

    await startGame();

    expect(screen.getByText('Game Status')).toBeInTheDocument();
  });
});
