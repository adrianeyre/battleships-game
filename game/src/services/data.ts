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

		console.log(process.env)
		if (!this.END_POINT) throw Error('REACT_APP_SERVER needs setting in your environment!');
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
			case MessageActionEnum.LOGOUT:
				this.handleData(MessageActionEnum.LOGOUT, message); break;
			case MessageActionEnum.CHECK:
				return this.checkIn();
		}

		this.messages.unshift(`[${ moment(message.dateTime).format("HH:mm") }] ${ message.message }`);
	}

	private checkIn = (): void => {
		this.sendMessage({
			action: MessageActionEnum.RESPOND,
			id: this.id,
			name: this.name,
			message: '',
		})
	}
}
