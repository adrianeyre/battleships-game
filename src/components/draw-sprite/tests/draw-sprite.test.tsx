import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Sprite from '../../../classes/sprite';
import ImageEnum from '../../../classes/enums/image-enum';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';

describe('Draw Sprite', () => {
  const buildProps = (
    overrides: Partial<IDrawSpriteProps> = {},
    visable = true,
  ): IDrawSpriteProps => ({
    sprite: new Sprite({
      key: 'sprite-key',
      visable,
      x: 1,
      y: 1,
      xPos: 1,
      yPos: 1,
      image: ImageEnum.BLANK,
      type: SpriteTypeEnum.BLANK,
    }),
    height: 10,
    width: 10,
    containerWidth: 100,
    onClick: vi.fn(),
    ...overrides,
  });

  it('Should render the sprite image at the given size', () => {
    render(<DrawSprite {...buildProps()} />);

    const image = screen.getByAltText('sprite');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('height', '10');
    expect(image).toHaveAttribute('width', '10');
  });

  it('Should translate the sprite by its board position', () => {
    const props = buildProps();
    props.sprite.x = 3;
    props.sprite.y = 2;

    const { container } = render(<DrawSprite {...props} />);

    expect(container.firstElementChild).toHaveStyle({ transform: 'translate3d(20px, 10px, 0)' });
  });

  it('Should render nothing visible when the sprite is not visable', () => {
    render(<DrawSprite {...buildProps({}, false)} />);

    expect(screen.queryByAltText('sprite')).not.toBeInTheDocument();
  });

  it('Should report the sprite key when clicked', async () => {
    const onClick = vi.fn();

    render(<DrawSprite {...buildProps({ onClick })} />);
    await userEvent.click(screen.getByAltText('sprite'));

    expect(onClick).toHaveBeenCalledWith('sprite-key');
  });

  it('Should report the sprite key on hover and right click', async () => {
    const onMouseOver = vi.fn();
    const onContextMenu = vi.fn();

    render(<DrawSprite {...buildProps({ onMouseOver, onContextMenu })} />);
    await userEvent.hover(screen.getByAltText('sprite'));
    await userEvent.pointer({ keys: '[MouseRight]', target: screen.getByAltText('sprite') });

    expect(onMouseOver).toHaveBeenCalledWith('sprite-key');
    expect(onContextMenu).toHaveBeenCalledWith('sprite-key');
  });
});
