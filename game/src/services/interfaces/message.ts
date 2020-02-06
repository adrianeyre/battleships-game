export default interface IMessage {
	dateTime?: number;
	type: 'message' | 'action';
	message: string;
}