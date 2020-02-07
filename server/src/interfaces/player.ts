export default interface IPlayer {
	id: string;
	name: string;
	socketId: string;
	setupComplete: boolean;
	hasCompletedSetup(): boolean;
}