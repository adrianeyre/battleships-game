
export default interface IGameStatusProps {
	messages: string[];
	containerWidth: number;
	spriteWidth: number;
	handleSendMessage(message: string): void;
}
