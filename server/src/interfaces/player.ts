export default interface IPlayer {
	id: string;
	name: string;
	socketId: string;
	setupComplete: boolean;
	currentUser: boolean;
	hasCompletedSetup(): boolean;
	setCurrentUser(): boolean;
	deseclectCurrectUser(): boolean;
}