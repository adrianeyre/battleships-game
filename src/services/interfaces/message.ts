import MessageActionEnum from '../enums/message-action-enum';
import PlayerResultEnum from '../../classes/enums/player-result-enum';

export default interface IMessage {
	dateTime?: number;
	action: MessageActionEnum
	id: string;
	name: string;
	message: string;
	colour: string;
	currentUser?: string;
	x?: number,
	y?: number,
	ship?: PlayerResultEnum;
}