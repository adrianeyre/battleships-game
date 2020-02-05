import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	zIndex: number
	image: string;
	type: SpriteTypeEnum;
}
