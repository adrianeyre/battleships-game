import { render, screen } from '@testing-library/react';

import FlashMessage from '../flash-message';
import IFlashMessageProps from '../interfaces/flash-message-props';
import MessageActionEnum from '../../../services/enums/message-action-enum';

describe('Flash Message', () => {
  const defaultProps: IFlashMessageProps = {
    message: {
      action: MessageActionEnum.START_GAME,
      id: 'id',
      name: 'name',
      message: 'The game has started',
      colour: 'red',
    },
    containerHeight: 800,
  };

  it('Should render the message', () => {
    render(<FlashMessage {...defaultProps} />);

    expect(screen.getByText('The game has started')).toBeInTheDocument();
  });

  it('Should colour the message and cap its width to the container', () => {
    const { container } = render(<FlashMessage {...defaultProps} />);

    expect(container.firstElementChild).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      'max-width': '800px',
    });
  });
});
