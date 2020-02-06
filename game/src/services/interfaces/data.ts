import IMessage from './message';

export default interface IData {
	messages: string[];
	sendMessage(message: IMessage): void;
}