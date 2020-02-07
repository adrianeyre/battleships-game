import IBattleShips from './interfaces/battle-ships';
import IMessage from './interfaces/message';
import MessageActionEnum from './enums/message-action-enum';
import IPlayer from './interfaces/player';
import Player from './player';

export default class BattleShips implements IBattleShips {
	private players: IPlayer[][]

	private readonly DEFAULT_BOTH_PLAYERS_LOGGED_IN_MESSAGE = 'Both players have logged in, please set your boards'
	private readonly DEFAULT_BOTH_PLAYERS_SETUP_COMPLETE_IN_MESSAGE = 'Both players have now setup their boards'

	constructor() {
		this.players = [];
	}

	public handle = (data: IMessage): IMessage[] => {
		switch (data.action) {
			case MessageActionEnum.MESSAGE:
				return this.sendMessage(data);
			case MessageActionEnum.LOGIN:
				return this.login(data);
			case MessageActionEnum.SETUP_COMPLETE:
				return this.setupComplete(data);
		}

		return [];
	}

	private login = (data: IMessage): IMessage[] => {
		const newPlayer = new Player(data);
		let lastPlayers = this.players[this.players.length - 1];

		if (!lastPlayers || lastPlayers.length > 1) {
			this.players.push([]);
			lastPlayers = this.players[this.players.length - 1];
		}

		lastPlayers.push(newPlayer);

		const messages: IMessage[] = [...lastPlayers].map((player: IPlayer) => this.message(MessageActionEnum.MESSAGE, player, data.message));

		if (lastPlayers.length > 1) {
			[...lastPlayers].forEach((player: IPlayer) => messages.push(this.message(MessageActionEnum.MESSAGE, player, this.DEFAULT_BOTH_PLAYERS_LOGGED_IN_MESSAGE)));
		}

		return messages;
	}

	private setupComplete = (data: IMessage): IMessage[] => {
		const playerGroup = this.getPlayerGroupById(data.id);
		const player = this.getPlayerFromGroupById(data.id, playerGroup);

		if (!player) throw Error('Player not found when setup is complete');
		player.hasCompletedSetup();

		const messages: IMessage[] = [...playerGroup].map((player: IPlayer) => this.message(MessageActionEnum.MESSAGE, player, data.message));
		const setupCompleteCount = playerGroup.reduce((accumulator: number, item: IPlayer) => accumulator + (item.setupComplete ? 1 : 0), 0);

		if (setupCompleteCount > 1) {
			[...playerGroup].forEach((player: IPlayer) => messages.push(this.message(MessageActionEnum.MESSAGE, player, this.DEFAULT_BOTH_PLAYERS_SETUP_COMPLETE_IN_MESSAGE)));
			[...playerGroup].forEach((player: IPlayer) => messages.push(this.message(MessageActionEnum.MESSAGE, player, `${ playerGroup[0].name } please select a block`)));
		}

		return messages;
	}

	private sendMessage = (data: IMessage): IMessage[] => {
		const playerGroup = this.getPlayerGroupById(data.id);
		return [...playerGroup].map((player: IPlayer) => this.message(MessageActionEnum.MESSAGE, player, data.message));
	}

	private getPlayerGroupById = (id: string): IPlayer[] => {
		let selectedPlayerGroup = null;

		this.players.forEach((playerGroup: IPlayer[]) => {
			if (this.getPlayerFromGroupById(id, playerGroup)) return selectedPlayerGroup = playerGroup;
		});

		if (!selectedPlayerGroup) throw Error(`No player for id: ${ id } was found`);

		return selectedPlayerGroup;
	}

	private getPlayerFromGroupById = (id: string, group: IPlayer[]) => group.find((player: IPlayer) => player.id === id);

	private message = (action: MessageActionEnum, player: IPlayer, message: string): IMessage => ({
		dateTime: Date.now(),
		action,
		id: player.id,
		socketId: player.socketId,
		name: player.name,
		message,
	})
}