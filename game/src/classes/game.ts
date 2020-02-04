import IGame from './interfaces/game';
import ISprite from './interfaces/sprite';
import PlayerResultEnum from './enums/player-result-enum';
import IBattleShipsProps from '../components/battle-ships/interfaces/battle-ships-props';
import Player from './player';
import IPlayer from './interfaces/player';

export default class Game implements IGame {
	public timer: any
	public timerInterval: number;
	public isGameInPlay: boolean;
	public player: IPlayer;
	public sprites: ISprite[];

	readonly defaultTimerInterval: number = 1000;
	
	constructor(config: IBattleShipsProps) {
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;
		this.player = new Player();
		this.sprites = [];
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		
	}

	public handleTimer = (): void => {

	}
}
