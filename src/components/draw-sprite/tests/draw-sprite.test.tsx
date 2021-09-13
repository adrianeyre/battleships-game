import { shallow } from 'enzyme';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Sprite from '../../../classes/sprite';
import ImageEnum from '../../../classes/enums/image-enum';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';

describe('Draw Sprite', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawSpriteProps = {
			sprite: new Sprite({
				key: 'key',
				visable: true,
				x: 10,
				y: 10,
				xPos: 10,
				yPos: 10,
				image: ImageEnum.BLANK,
				type: SpriteTypeEnum.BLANK,
			}),
			height: 100,
			width: 100,
			containerWidth: 100,
			onClick: jest.fn(),
		};

		const drawFish = shallow(<DrawSprite {...defaultProps} />);
		expect(drawFish).toMatchSnapshot();
	});
});