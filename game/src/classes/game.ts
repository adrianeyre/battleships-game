import IGame from './interfaces/game';
import PlayerResultEnum from './enums/player-result-enum';
import IBattleShipsProps from '../components/battle-ships/interfaces/battle-ships-props';
import Player from './player';
import IPlayer from './interfaces/player';
import IData from '../services/interfaces/data';
import Data from '../services/data';

export default class Game implements IGame {
	public data: IData;
	public timer: any
	public timerInterval: number;
	public isGameInPlay: boolean;
	public players: IPlayer[];

	private playerIndex: number = 0;
	readonly defaultTimerInterval: number = 1000;
	
	constructor(config: IBattleShipsProps) {
		this.data = new Data();
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;
		this.players = [
			new Player({ key: 'player', y: 1 }),
			new Player({ key: 'opponent', y: 12 }),
		];

		this.data.sendMessage({ type: 'message', message: 'Battleships welcomes player' });
	}

	public handleInput = (playerResult: PlayerResultEnum, key?: string): void => {
		switch (playerResult) {
			case PlayerResultEnum.HOVER:
				this.updateBlock(key); break;
			case PlayerResultEnum.SELECT:
				this.selectBlock(key); break;
			case PlayerResultEnum.RIGHT_SELECT:
				this.rotateBlock(key); break;
			case PlayerResultEnum.DONE_EDITING:
				this.playerDoneEditing(); break;
		}
	}

	public handleTimer = (): void => {

	}

	private updateBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.players[this.playerIndex].updateBlock(key, false);
	}

	private selectBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.handleInput(this.players[this.playerIndex].updateBlock(key, true));
	}

	private rotateBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.players[this.playerIndex].rotate(key);
	}

	private playerDoneEditing = (): void => {
		this.data.sendMessage({ type: 'message', message: 'Player is ready to play the game' });
	}
}
