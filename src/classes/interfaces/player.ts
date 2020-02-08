import ISprite from './sprite';
import IShipStatus from './ship-status';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IPlayer {
	key: string;
	id: string;
	name: string;
	sprites: ISprite[];
	board: string[][];
	direction: DirectionEnum;
	shipStatus: IShipStatus;
	edit: boolean;
	reset(): void;
	updateBlock(key: string, set: boolean): PlayerResultEnum;
	rotate(key: string): void;
	findSpriteByKey(key: string): ISprite | undefined;
	fire(x: number, y: number): PlayerResultEnum;
	hit(x: number, y: number): void;
	miss(x: number, y: number): void;
}
