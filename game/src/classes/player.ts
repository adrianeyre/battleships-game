import IPlayer from './interfaces/player';
import IPlayerConfig from './interfaces/player-config'
import ISprite from './interfaces/sprite';
import IMatrices from './interfaces/matrices';
import Sprite from './sprite';
import ImageEnum from './enums/image-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';

import * as matrixData from './data/matrix';

export default class Player implements IPlayer {
	public key: string;
	public score: number;
	public isAlive: boolean;
	public sprites: ISprite[];
	public board: string[][];
	public direction: DirectionEnum;
	public edit: boolean;

	private yPos: number;
	private ships: string[] = ['destroyer', 'submarine', 'cruiser', 'battleship', 'carrier'];
	private shipOn: number = 0;
	readonly INITIAL_PLAYER_LIVES: number = 3;

	constructor(config: IPlayerConfig) {
		this.key = config.key;
		this.score = 0;
		this.isAlive = true;
		this.sprites = [];
		this.yPos = config.y;
		this.board = [];
		this.direction = DirectionEnum.HORIZONTAL;
		this.edit = true;

		this.setBoard();
	}

	public updateBlock = (key: string, set: boolean): PlayerResultEnum => {
		if (!this.edit) return PlayerResultEnum.ERROR;

		const matrices = matrixData.default.find((block: IMatrices) => block.key === this.ships[this.shipOn]);
		const baseSprite = this.sprites.find((s: ISprite) => s.key === key);
		if (!matrices || !baseSprite) return PlayerResultEnum.ERROR;

		this.refeshBoardImages();
		const allowed = this.setBoardImages(matrices, baseSprite, set);

		if (set && allowed) this.shipOn ++;
		if (this.shipOn >= this.ships.length) {
			this.edit = false;
			return PlayerResultEnum.DONE_EDITING;
		}

		return PlayerResultEnum.SAFE;
	}

	private setBoardImages = (matrices: IMatrices, baseSprite: ISprite, set: boolean): boolean => {
		let allowed = true;
		const images = [];
		const blocks = [];

		for (let blockIndex = matrices.matrix[this.direction].length - 1; blockIndex >= 0 ; blockIndex --) {
			const block = matrices.matrix[this.direction][blockIndex];
			const sprite = this.sprites.find((s: ISprite) => s.x === block[0] + baseSprite.x && s.y === block[1] + baseSprite.y);
			if (!sprite) {
				allowed = false;
				continue;
			}

			allowed = allowed ? this.board[sprite.y-1][sprite.x-1] === ImageEnum.BLANK : false;

			images.push({ allowed: matrices.images[this.direction][allowed ? 0 : 1][blockIndex], disallowed: matrices.images[this.direction][allowed ? 0 : 1][blockIndex] });
			blocks.push({ x: sprite.x-1, y: sprite.y-1});
			sprite.updateImage(images[images.length - 1][allowed ? 'allowed' : 'disallowed']);
		}

		if (set && allowed) {
			for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
				this.board[blocks[blockIndex].y][blocks[blockIndex].x] = images[blockIndex].allowed;
			}
		}

		return allowed
	}

	public rotate = (key: string): void => {
		this.direction = this.direction === DirectionEnum.HORIZONTAL ? DirectionEnum.VERTICAL : DirectionEnum.HORIZONTAL;
		this.updateBlock(key, false);
	}

	private setBoard = (): void => {
		this.board = [];

		for (let y = this.yPos; y <= this.yPos + 9; y++) {
			const line = [];

			for (let x = 1; x <= 10; x++) {
				line.push(ImageEnum.BLANK)
				this.sprites.push(new Sprite({
					key: `${ this.key }-${ x }-${ y }`,
					visable: true,
					x,
					y,
					image: ImageEnum.BLANK,
					type: SpriteTypeEnum.BLANK,
				}))
			}

			this.board.push(line);
		}
	}

	private refeshBoardImages = (): void => {
		for (let y = this.yPos; y <= this.yPos + 9; y++) {
			for (let x = 1; x <= 10; x++) {
				const sprite = this.sprites.find((s: ISprite) => s.key === `${ this.key }-${ x }-${ y }`);
				if (!sprite) continue;

				sprite.updateImage(this.board[y-1][x-1]);
			}
		}
	}
}
