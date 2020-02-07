import IGame from './interfaces/game';
import PlayerResultEnum from './enums/player-result-enum';
import IBattleShipsProps from '../components/battle-ships/interfaces/battle-ships-props';
import Player from './player';
import IPlayer from './interfaces/player';
import IData from '../services/interfaces/data';
import Data from '../services/data';
import MessageActionEnum from '../services/enums/message-action-enum';

export default class Game implements IGame {
	public data: IData;
	public timer: any
	public timerInterval: number;
	public isGameInPlay: boolean;
	public players: IPlayer[];

	private playerIndex: number = 0;
	private opponentIndex: number = 1;
	readonly defaultTimerInterval: number = 1000;
	
	constructor(config: IBattleShipsProps) {
		this.data = new Data();
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;
		this.players = [
			new Player({ key: 'player', name: config.playerName, y: 1 }),
			new Player({ key: 'opponent', y: 12 }),
		];

		this.data.sendMessage({
			action: MessageActionEnum.LOGIN,
			id: this.players[this.playerIndex].id,
			name: this.players[this.playerIndex].name,
			message: `${ this.players[this.playerIndex].name } has joined the game`,
		});
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
			case PlayerResultEnum.FIRE:
				this.fire(key); break;
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

	private fire = (key?: string): void => {
		if (!key) return;

		const sprite = this.players[this.opponentIndex].findSpriteByKey(key);
		if (!sprite) return;

		this.sendMessageToService(MessageActionEnum.FIRE, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] fire x: ${ sprite.xPos }, y: ${ sprite.yPos }`, sprite.xPos, sprite.yPos)
	}

	private playerDoneEditing = (): void => this.sendMessageToService(MessageActionEnum.SETUP_COMPLETE, this.players[this.playerIndex], `${ this.players[this.playerIndex].name } has finished setting their board up`)
	public sendMessage = (message: string): void => this.sendMessageToService(MessageActionEnum.MESSAGE, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] ${ message }`);

	private sendMessageToService = (action: MessageActionEnum, player: IPlayer, message: string, x?: number, y?: number): void => this.data.sendMessage({
		action,
		id: player.id,
		name: player.name,
		message,
		x,
		y,
	});
}
