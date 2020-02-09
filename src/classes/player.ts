import { v4 as uuid } from 'uuid';

import IPlayer from './interfaces/player';
import IPlayerConfig from './interfaces/player-config'
import ISprite from './interfaces/sprite';
import IMatrices from './interfaces/matrices';
import IShipStatus from './interfaces/ship-status';
import Sprite from './sprite';
import ImageEnum from './enums/image-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';

import * as matrixData from './data/matrix';

export default class Player implements IPlayer {
	public key: string;
	public id: string;
	public name: string;
	public sprites: ISprite[];
	public board: string[][];
	public direction: DirectionEnum;
	public shipStatus: IShipStatus;
	public edit: boolean;

	private yPos: number;
	private ships: string[] = ['destroyer', 'submarine', 'cruiser', 'battleship', 'carrier'];
	private shipOn: number = 0;

	constructor(config: IPlayerConfig) {
		this.key = config.key;
		this.id = uuid();
		this.name = config.name || config.key;
		this.sprites = [];
		this.yPos = config.y;
		this.board = [];
		this.direction = DirectionEnum.HORIZONTAL;
		this.shipStatus = this.resetShipStatus();
		this.edit = true;

		this.setBoard();
	}

	public reset = (): void => {
		this.shipOn = 0;
		this.board = [];
		this.sprites = [];
		this.edit = true;
		this.direction = DirectionEnum.HORIZONTAL;
		this.shipStatus = this.resetShipStatus();

		this.setBoard();
	}

	public updateBlock = (key: string, set: boolean): PlayerResultEnum => {
		if (!this.edit) return PlayerResultEnum.ERROR;

		const matrices = this.getMatrixByKey(this.ships[this.shipOn]);
		const baseSprite = this.sprites.find((s: ISprite) => s.key === key);
		if (!matrices || !baseSprite) throw Error('No matrix or sprite found!')

		this.refeshBoardImages();
		const allowed = this.setBoardImages(matrices, baseSprite, set);

		if (set && allowed) this.shipOn ++;
		if (this.shipOn >= this.ships.length) {
			this.edit = false;
			return PlayerResultEnum.DONE_EDITING;
		}

		return PlayerResultEnum.SAFE;
	}

	public fire = (x: number, y: number): PlayerResultEnum => {
		const sprite = this.findSpriteByCoords(x, y);
		if (!sprite) throw new Error('Sprite not found to fire');

		const result = sprite.fire();

		if (result === PlayerResultEnum.HIT) {
			const type = sprite.type
			this.shipStatus[type].value ++;

			let shipsDestroyedCount = 0;
			this.ships.forEach((ship: string) => {
				if (this.shipStatus[ship].value >= this.shipStatus[ship].size) shipsDestroyedCount++;
			});

			if (shipsDestroyedCount >= this.ships.length) return PlayerResultEnum.DESTROYED;
			if (this.shipStatus[type].value >= this.shipStatus[type].size) return PlayerResultEnum[type];
		}

		return result
	}

	public hit = (x: number, y: number): void => {
		const sprite = this.findSpriteByCoords(x, y);
		if (!sprite) throw new Error('Sprite not found to hit');

		sprite.hit();
	}

	public miss = (x: number, y: number): void => {
		const sprite = this.findSpriteByCoords(x, y);
		if (!sprite) throw new Error('Sprite not found to miss');

		sprite.miss();
	}

	public rotate = (key: string): void => {
		this.direction = this.direction === DirectionEnum.HORIZONTAL ? DirectionEnum.VERTICAL : DirectionEnum.HORIZONTAL;
		this.updateBlock(key, false);
	}

	public findSpriteByKey = (key: string): ISprite | undefined =>  this.sprites.find((s: ISprite) => s.key === key);

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
			if (allowed) sprite.updateType(SpriteTypeEnum[this.ships[this.shipOn]]);
		}

		if (set && allowed) {
			for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
				this.board[blocks[blockIndex].y][blocks[blockIndex].x] = images[blockIndex].allowed;
			}
		}

		return allowed
	}

	private setBoard = (): void => {
		this.board = [];
		let yPos = 0;

		for (let y = this.yPos; y <= this.yPos + 9; y++) {
			const line = [];
			yPos ++;

			for (let x = 1; x <= 10; x++) {
				line.push(ImageEnum.BLANK)
				this.sprites.push(new Sprite({
					key: `${ this.key }-${ x }-${ yPos }`,
					visable: true,
					x,
					y,
					xPos: x,
					yPos,
					image: ImageEnum.BLANK,
					type: SpriteTypeEnum.BLANK,
				}))
			}

			this.board.push(line);
		}
	}

	private findSpriteByCoords = (x: number, y: number): ISprite | undefined => this.sprites.find((s: ISprite) => s.key === `${ this.key }-${ x }-${ y }`);

	private refeshBoardImages = (): void => {
		for (let y = this.yPos; y <= this.yPos + 9; y++) {
			for (let x = 1; x <= 10; x++) {
				const sprite = this.findSpriteByCoords(x, y);
				if (!sprite) continue;

				sprite.updateImage(this.board[y-1][x-1]);
			}
		}
	}

	private getMatrixByKey = (key: string): IMatrices | undefined => matrixData.default.find((block: IMatrices) => block.key === key);

	private resetShipStatus = (): IShipStatus => {
		const destroyer = this.getMatrixByKey('destroyer');
		const submarine = this.getMatrixByKey('submarine');
		const cruiser = this.getMatrixByKey('cruiser');
		const battleship = this.getMatrixByKey('battleship');
		const carrier = this.getMatrixByKey('carrier');

		return ({
			destroyer: {
				value: 0,
				size: destroyer?.size || 0,
			},
			submarine: {
				value: 0,
				size: submarine?.size || 0,
			},
			cruiser: {
				value: 0,
				size: cruiser?.size || 0,
			},
			battleship: {
				value: 0,
				size: battleship?.size || 0,
			},
			carrier: {
				value: 0,
				size: carrier?.size || 0,
			},
		})
	}
}
