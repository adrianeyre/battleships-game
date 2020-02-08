import SpriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	xPos: number;
	yPos: number;
	zIndex: number
	image: string;
	type: SpriteTypeEnum;
	updateImage(image: string): string;
	updateType(type: SpriteTypeEnum): SpriteTypeEnum;
	isImageBlank(): boolean;
	fire(): PlayerResultEnum;
	hit(): void;
	miss(): void;
}
