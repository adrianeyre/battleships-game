import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import GameStatus from '../game-status';
import IGameStatusProps from '../interfaces/game-status-props';
import MessageActionEnum from '../../../services/enums/message-action-enum';

describe('Game Status', () => {
  const buildProps = (overrides: Partial<IGameStatusProps> = {}): IGameStatusProps => ({
    messages: [
      {
        action: MessageActionEnum.MESSAGE,
        id: 'id',
        name: 'name',
        message: '[name] hello',
        colour: 'blue',
        dateTime: Date.UTC(2024, 0, 1, 9, 30),
      },
    ],
    containerWidth: 800,
    spriteWidth: 40,
    handleSendMessage: vi.fn(),
    ...overrides,
  });

  it('Should render each message with a timestamp', () => {
    render(<GameStatus {...buildProps()} />);

    expect(screen.getByText('[name] hello')).toBeInTheDocument();
    // Rendered in the runner's local zone, so match the shape not the hour.
    expect(screen.getByText(/^\[\d{2}:\d{2}\]$/)).toBeInTheDocument();
  });

  it('Should send the typed message and then clear the box', async () => {
    const handleSendMessage = vi.fn();

    render(<GameStatus {...buildProps({ handleSendMessage })} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'ready');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(handleSendMessage).toHaveBeenCalledWith('ready');
    expect(input).toHaveValue('');
  });
});
