import IGame from './interfaces/game';
import ISprite from './interfaces/sprite';
import PlayerResultEnum from './enums/player-result-enum';
import IBattleShipsProps from '../components/battle-ships/interfaces/battle-ships-props';
import Player from './player';
import IPlayer from './interfaces/player';
import IBoard from './interfaces/board';
import Board from './board';

export default class Game implements IGame {
	public timer: any
	public timerInterval: number;
	public isGameInPlay: boolean;
	public player: IPlayer;
	public board: IBoard;

	readonly defaultTimerInterval: number = 1000;
	
	constructor(config: IBattleShipsProps) {
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;
		this.player = new Player();
		this.board = new Board();
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		
	}

	public handleTimer = (): void => {

	}
}
