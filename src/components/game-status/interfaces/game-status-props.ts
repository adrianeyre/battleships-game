import IMessage from '../../../services/interfaces/message';

export default interface IGameStatusProps {
	messages: IMessage[];
	containerWidth: number;
	spriteWidth: number;
	handleSendMessage(message: string): void;
}
