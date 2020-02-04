import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

import Block from '../block';
import IBlockProps from '../interfaces/block-props';
import ISprite from 'classes/interfaces/sprite';

describe('Block', () => {
	let defaultConfig: IBlockProps

	beforeEach(() => {
		defaultConfig = {
			key: 'sprite',
			x: 10,
			y: 10,
			direction: DirectionEnum.DOWN,
			type: SpriteTypeEnum.SPRITE01,
			containerHeight: 20,
			containerWidth: 10,
		}
	})

	it('Should create Block class', () => {
		const block = new Block(defaultConfig);

		expect(block.key).toEqual('sprite');
		expect(block.x).toEqual(10);
		expect(block.y).toEqual(10);
		expect(block.direction).toEqual(DirectionEnum.DOWN);
		expect(block.type).toEqual(SpriteTypeEnum.SPRITE01);
	});

	it('Should rotate the block to the right', () => {
		const block = new Block(defaultConfig);
		const sprites: ISprite[] = [];

		expect(block.direction).toEqual(DirectionEnum.DOWN);
		block.rotate(DirectionEnum.RIGHT, sprites);
	});

	it('Should move the block down', () => {
		const block = new Block(defaultConfig);
		const sprites: ISprite[] = [];

		expect(block.y).toEqual(10);
		block.move(DirectionEnum.DOWN, sprites);
		expect(block.y).toEqual(11);
	});
});