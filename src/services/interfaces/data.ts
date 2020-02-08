import IMessage from './message';

export default interface IData {
	messages: IMessage[];
	sendMessage(message: IMessage): void;
}