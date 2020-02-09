import SpriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import Sprite from '../sprite';
import ISpriteProps from '../interfaces/sprite-props';
import ImageEnum from '../enums/image-enum';
import ISprite from '../interfaces/sprite';

describe('Sprite', () => {
	let defaultConfig: ISpriteProps
	let sprite: ISprite;

	beforeEach(() => {
		defaultConfig = {
			key: 'sprite',
			visable: true,
			x: 10,
			y: 10,
			xPos: 10,
			yPos: 10,
			image: ImageEnum.BLANK,
			type: SpriteTypeEnum.BLANK,
		}

		sprite = new Sprite(defaultConfig);
	})

	it('Should create Sprite class', () => {
		expect(sprite.key).toEqual('sprite');
		expect(sprite.visable).toEqual(true);
		expect(sprite.x).toEqual(10);
		expect(sprite.y).toEqual(10);
		expect(sprite.xPos).toEqual(10);
		expect(sprite.yPos).toEqual(10);
		expect(sprite.zIndex).toEqual(5000);
		expect(sprite.type).toEqual(SpriteTypeEnum.BLANK);
	});

	it('Method updateImage: Should upate the image', () => {
		sprite.updateImage('hit');
		expect(sprite.image).toEqual('block-14.png');
	});

	it('Method updateType: Should upate the type', () => {
		sprite.updateType(SpriteTypeEnum.carrier);
		expect(sprite.type).toEqual(SpriteTypeEnum.carrier);
	});

	it('Method isImageBlank: Should check if sprite is blank', () => {
		expect(sprite.isImageBlank()).toEqual(true);
		sprite.updateImage('hit');
		expect(sprite.isImageBlank()).toEqual(false);
	});

	it('Method fire: Should miss a ship', () => {
		expect(sprite.fire()).toEqual(PlayerResultEnum.MISS);
	});

	it('Method fire: Should hit a ship', () => {
		sprite.updateImage('hit');
		expect(sprite.fire()).toEqual(PlayerResultEnum.HIT);
	});

	it('Method hit: Should update image to hit', () => {
		expect(sprite.image).toEqual('block-00.png');
		sprite.hit();
		expect(sprite.image).toEqual('block-14.png');
	});

	it('Method miss: Should update image to miss', () => {
		expect(sprite.image).toEqual('block-00.png');
		sprite.miss();
		expect(sprite.image).toEqual('block-13.png');
	});
});