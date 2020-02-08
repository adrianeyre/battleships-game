import socketIOClient from 'socket.io-client';
import moment from 'moment';

import IData from './interfaces/data';
import IDataProps from './interfaces/data-props'
import IMessage from "./interfaces/message";
import MessageActionEnum from './enums/message-action-enum';

export default class Data implements IData {
	public messages: string[];
	public handleData: any;
	public handleMessageReceived: any;

	private socket: any;
	private readonly END_POINT: string = 'http://localhost:4000';

	constructor(config: IDataProps) {
		this.messages = [];
		this.handleData = config.handleData;
		this.handleMessageReceived = config.handleMessageReceived;
		this.socket = socketIOClient(this.END_POINT);
		this.socket.on("battle-ships-data", (message: IMessage) => this.handleMessage(message));
	}

	public sendMessage = (message: IMessage): number => this.socket.emit("battle-ships-data", message);

	private handleMessage = (message: IMessage): void => {
		this.handleMessageReceived();

		switch (message.action) {
			case MessageActionEnum.FIRE:
				this.handleData(MessageActionEnum.FIRE, message); break;
			case MessageActionEnum.HIT:
				this.handleData(MessageActionEnum.HIT, message); break;
			case MessageActionEnum.MISS:
				this.handleData(MessageActionEnum.MISS, message); break;
			case MessageActionEnum.GAME_OVER:
				this.handleData(MessageActionEnum.GAME_OVER, message); break;
		}

		this.messages.unshift(`[${ moment(message.dateTime).format("HH:mm") }] ${ message.message }`);
	}
}
