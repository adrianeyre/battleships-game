import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from 'classes/enums/image-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	zIndex: number
	image: ImageEnum;
	type: SpriteTypeEnum;
}
