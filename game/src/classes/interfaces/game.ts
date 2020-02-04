import PlayerResultEnum from '../enums/player-result-enum';
import IPlayer from './player';
import ISprite from './sprite';

export default interface IGame {
	player: IPlayer;
	sprites: ISprite[];
	timer: any;
	timerInterval: number;
	isGameInPlay: boolean;
	handleInput(playerResult: PlayerResultEnum): void;
	handleTimer(): void;
}
