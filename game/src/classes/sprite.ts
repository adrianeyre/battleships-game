import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';

import blank from '../images/block-00.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;

	private readonly Z_INDEX: number = 5000;
	private readonly images = {
		blank
	}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.zIndex = this.Z_INDEX;
		this.image = this.images[config.image];
		this.type = config.type;
	}
}
