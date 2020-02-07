import ISprite from './sprite';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IPlayer {
	key: string;
	id: string;
	name: string;
	sprites: ISprite[];
	board: string[][];
	direction: DirectionEnum;
	score: number;
	isAlive: boolean;
	edit: boolean;
	updateBlock(key: string, set: boolean): PlayerResultEnum;
	rotate(key: string): void;
}
