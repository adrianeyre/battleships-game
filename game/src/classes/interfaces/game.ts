import PlayerResultEnum from '../enums/player-result-enum';
import IPlayer from './player';
import IBoard from './board';

export default interface IGame {
	player: IPlayer;
	board: IBoard;
	timer: any;
	timerInterval: number;
	isGameInPlay: boolean;
	handleInput(playerResult: PlayerResultEnum): void;
	handleTimer(): void;
}
