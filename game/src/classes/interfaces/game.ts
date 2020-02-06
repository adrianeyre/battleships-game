import PlayerResultEnum from '../enums/player-result-enum';
import IPlayer from './player';
import IData from '../../services/interfaces/data';

export default interface IGame {
	players: IPlayer[];
	data: IData;
	timer: any;
	timerInterval: number;
	isGameInPlay: boolean;
	handleInput(playerResult: PlayerResultEnum, key?: string): void;
	handleTimer(): void;
}
