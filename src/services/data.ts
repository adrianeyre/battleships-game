import socketIOClient from 'socket.io-client';

import IData from './interfaces/data';
import IDataProps from './interfaces/data-props'
import IMessage from "./interfaces/message";
import MessageActionEnum from './enums/message-action-enum';

export default class Data implements IData {
	public messages: IMessage[];
	public handleData: any;
	public handleMessageReceived: any;
	public id: string;
	public name: string;

	private socket: any;
	private readonly END_POINT: string | undefined = process.env.REACT_APP_SERVER;

	constructor(config: IDataProps) {
		this.messages = [];
		this.handleData = config.handleData;
		this.handleMessageReceived = config.handleMessageReceived;
		this.id = config.id;
		this.name = config.name;

		if (!this.END_POINT) throw Error('REACT_APP_SERVER needs setting in your environment!');
		this.socket = socketIOClient(this.END_POINT);
		this.socket.on("battle-ships-data", (message: IMessage) => this.handleMessage(message));
	}

	public sendMessage = (message: IMessage): number => this.socket.emit("battle-ships-data", message);

	private handleMessage = (message: IMessage): void => {
		this.handleMessageReceived();

		switch (message.action) {
			case MessageActionEnum.FIRE:
			case MessageActionEnum.HIT:
			case MessageActionEnum.MISS:
			case MessageActionEnum.GAME_OVER:
			case MessageActionEnum.LOGOUT:
			case MessageActionEnum.SUNK:
			case MessageActionEnum.START_GAME:
				this.handleData(message); break;
			case MessageActionEnum.CHECK:
				return this.checkIn();
		}

		this.addMessage(message);
	}

	private addMessage = (message: IMessage) => this.messages.unshift({...message});

	private checkIn = (): void => {
		this.sendMessage({
			action: MessageActionEnum.RESPOND,
			id: this.id,
			name: this.name,
			message: '',
			colour: '',
		})
	}
}
