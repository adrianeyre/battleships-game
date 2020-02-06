import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';

import blank from '../images/block-00.png';
import block01 from '../images/block-01.png';
import block02 from '../images/block-02.png';
import block03 from '../images/block-03.png';
import block04 from '../images/block-04.png';
import block05 from '../images/block-05.png';
import block06 from '../images/block-06.png';
import block07 from '../images/block-07.png';
import block08 from '../images/block-08.png';
import block09 from '../images/block-09.png';
import block10 from '../images/block-10.png';
import block11 from '../images/block-11.png';
import block12 from '../images/block-12.png';

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
		blank,
		block01, block02, block03, block04, block05,
		block06, block07, block08, block09, block10,
		block11, block12,
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

	public updateImage = (image: string): string => this.image = this.images[image];
}
