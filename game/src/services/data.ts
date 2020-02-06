import socketIOClient from 'socket.io-client';
import moment from 'moment';

import IData from './interfaces/data';
import IMessage from "./interfaces/message";

export default class Data implements IData {
	public messages: string[];

	private socket: any;
	private readonly END_POINT: string = 'http://localhost:5000';

	constructor() {
		this.messages = [];
		this.socket = socketIOClient(this.END_POINT);
		this.socket.on("battle-ships-data", (message: IMessage) => this.handleMessage(message));
	}

	public sendMessage = (message: IMessage): number => this.socket.emit("battle-ships-data", message);

	private handleMessage = (message: IMessage): void => {
		this.messages.unshift(`[${ moment(message.dateTime).format("MM/DD/YYYY HH:mm") }] ${ message.message }`);
	}
}
