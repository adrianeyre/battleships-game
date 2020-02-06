export default interface IData {
	dateTime?: number;
	type: 'message' | 'action';
	message?: string;
}