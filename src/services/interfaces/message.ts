import MessageActionEnum from '../enums/message-action-enum';

export default interface IMessage {
	dateTime?: number;
	action: MessageActionEnum
	id: string;
	name: string;
	message: string;
	currentUser?: string;
	x?: number,
	y?: number,
}