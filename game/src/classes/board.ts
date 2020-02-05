import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import Sprite from './sprite';
import ImageEnum from './enums/image-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';

export default class Baord implements IBoard {
	public sprites: ISprite[];

	constructor() {
		this.sprites = [];

		this.setupBoard();
	}

	private setupBoard = () => {
		this.sprites = [];

		for (let y = 1; y <= 10; y++) {
			for (let x = 1; x <= 10; x++) {
				this.sprites.push(new Sprite({
					key: `player-${ x }-${ y }`,
					visable: true,
					x,
					y,
					image: ImageEnum.BLANK,
					type: SpriteTypeEnum.BLANK,
				}))
			}
		}

		for (let y = 12; y <= 21; y++) {
			for (let x = 1; x <= 10; x++) {
				this.sprites.push(new Sprite({
					key: `opponent-${ x }-${ y }`,
					visable: true,
					x,
					y,
					image: ImageEnum.BLANK,
					type: SpriteTypeEnum.BLANK,
				}))
			}
		}
	}
}