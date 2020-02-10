import IGame from './interfaces/game';
import PlayerResultEnum from './enums/player-result-enum';
import IBattleShipsProps from '../components/battle-ships/interfaces/battle-ships-props';
import Player from './player';
import IPlayer from './interfaces/player';
import IData from '../services/interfaces/data';
import Data from '../services/data';
import MessageActionEnum from '../services/enums/message-action-enum';
import IMessage from 'services/interfaces/message';

export default class Game implements IGame {
	public data: IData;
	public timer: any
	public isGameInPlay: boolean;
	public players: IPlayer[];
	public flashMessage?: IMessage;

	private playerIndex: number = 0;
	private opponentIndex: number = 1;
	private fireX: number;
	private fireY: number;
	private messageSending: boolean;
	private flashMessageTimer?: any;
	private readonly flashMessageTime: number = 5000;
	
	constructor(config: IBattleShipsProps) {
		const handleData = (message: IMessage) => this.handleData(message);
		const handleMessageReceived = () => this.messageSending = false;

		this.isGameInPlay = false;
		this.fireX = -1;
		this.fireY = -1;
		this.messageSending = false;
		this.players = [
			new Player({ key: 'player', name: config.playerName, y: 1 }),
			new Player({ key: 'opponent', y: 12 }),
		];

		const player = this.players[this.playerIndex];
		this.data = new Data({ handleData, handleMessageReceived, id: player.id, name: player.name });

		this.data.sendMessage({
			action: MessageActionEnum.LOGIN,
			id: this.players[this.playerIndex].id,
			name: this.players[this.playerIndex].name,
			colour: '',
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
			case PlayerResultEnum.HIT:
				this.hit(); break;
			case PlayerResultEnum.MISS:
				this.miss(); break;
			case PlayerResultEnum.DESTROYED:
				this.destroyed(key); break;
			case PlayerResultEnum.destroyer:
			case PlayerResultEnum.submarine:
			case PlayerResultEnum.cruiser:
			case PlayerResultEnum.battleship:
			case PlayerResultEnum.carrier:
				this.sunk(playerResult, key); break;
		}
	}

	public handleTimer = (): void => {};

	private updateBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.players[this.playerIndex].updateBlock(key, false);
	}

	private selectBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.handleInput(this.players[this.playerIndex].updateBlock(key, true));
	}

	private rotateBlock = (key?: string): void => {
		if (key && this.players[this.playerIndex].edit) this.players[this.playerIndex].rotate(key);
	}

	private sunk = (playerResult: PlayerResultEnum, key?: string): void => {
		this.hit();
		this.sendMessageToService(MessageActionEnum.SUNK, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] you have sunk my ${ playerResult }`);
	}

	private destroyed = (key?: string): void => {
		this.hit();
		this.sendMessageToService(MessageActionEnum.DESTROYED, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] all my ships are sunk! you win!`);
	}

	private fire = (key?: string): void => {
		if (!key || this.messageSending) return;

		const sprite = this.players[this.opponentIndex].findSpriteByKey(key);
		if (!sprite) throw Error('No sprite found to fire!');
		if (!sprite.isImageBlank()) return

		this.fireX = sprite.xPos;
		this.fireY = sprite.yPos;
		const player = this.players[this.playerIndex];
		this.sendMessageToService(MessageActionEnum.FIRE, player, `[${ player.name }] fire x: ${ sprite.xPos }, y: ${ sprite.yPos }`, player.id, sprite.xPos, sprite.yPos)
	}

	private handleData = (message: IMessage): void => {
		switch (message.action) {
			case MessageActionEnum.GAME_OVER:
				return this.gameOver(message);
			case MessageActionEnum.LOGOUT:
				return this.logout();
			case MessageActionEnum.SUNK:
				return this.setFlashMessage(message);
		}

		if (!message.currentUser) throw new Error('No X, Y or Current User set!');

		const currentUser = message.currentUser === this.players[this.playerIndex].id;
		const playerReceiving = this.players.find((p: IPlayer) => p.id !== message.currentUser);

		if (!playerReceiving) throw Error('playerRequesting or playerReceiving not found!');

		switch (message.action) {
			case MessageActionEnum.FIRE:
				return this.handleFire(playerReceiving, message, currentUser);
			case MessageActionEnum.HIT:
				return this.handleHit(message, currentUser, playerReceiving);
			case MessageActionEnum.MISS:
				return this.handleMiss(message, currentUser, playerReceiving);
		}
	}

	private handleFire = (player: IPlayer, message: IMessage, currentUser: boolean): void => {
		if (currentUser) return;
		if (!message.x || !message.y) throw new Error('No X, Y or Current User set!');

		this.handleInput(player.fire(message.x, message.y));
	}

	private handleHit = (message: IMessage, currentUser: boolean, player?: IPlayer): void => {
		if (!currentUser) return;
		if (!player || this.fireX < 1 || this.fireY < 1) throw new Error('No Player or fireX or fireY not set!');
		
		player.hit(this.fireX, this.fireY);
	}

	private handleMiss = (message: IMessage, currentUser: boolean, player?: IPlayer): void => {
		if (!currentUser) return;
		if (!player || this.fireX < 1 || this.fireY < 1) throw new Error('No Player or fireX or fireY not set!');
		
		player.miss(this.fireX, this.fireY);
	}

	private gameOver = (message: IMessage) => {
		this.setFlashMessage(message);
		this.players[this.playerIndex].reset();
		this.players[this.opponentIndex].reset();
	}

	private logout = (): void => {
		this.isGameInPlay = false;
	}

	private hit = (): void => this.sendMessageToService(MessageActionEnum.HIT, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] has been hit!`);
	private miss = (): void => this.sendMessageToService(MessageActionEnum.MISS, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] you missed my ships!`);
	private playerDoneEditing = (): void => this.sendMessageToService(MessageActionEnum.SETUP_COMPLETE, this.players[this.playerIndex], `${ this.players[this.playerIndex].name } has finished setting their board up`)
	public sendMessage = (message: string): void => this.sendMessageToService(MessageActionEnum.MESSAGE, this.players[this.playerIndex], `[${ this.players[this.playerIndex].name }] ${ message }`);

	private sendMessageToService = (action: MessageActionEnum, player: IPlayer, message: string, currentUser?: string, x?: number, y?: number): void => {
		this.messageSending = true;
		this.data.sendMessage({
			action,
			id: player.id,
			name: player.name,
			message,
			colour: '',
			currentUser,
			x,
			y,
		});
	}

	private setFlashMessage = (message: IMessage): void => {
		this.flashMessage = message;

		this.flashMessageTimer = setInterval(this.unsetFlashMessage, this.flashMessageTime);
	}
	
	private unsetFlashMessage = (): void => {
		this.flashMessage = undefined;

		clearInterval(this.flashMessageTimer);
	}
}
