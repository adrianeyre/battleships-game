import IPlayer from './interfaces/player';
import IPlayerProps from './interfaces/player-props'

export default class Player implements IPlayer {
	public id: string;
	public name: string;
	public socketId: string;
	public setupComplete: boolean;
	public currentUser: boolean;
	public checked: boolean;

	constructor(props: IPlayerProps) {
		this.id = props.id;
		this.name = props.name;
		this.socketId = props.socketId;
		this.setupComplete = false;
		this.currentUser = false;
		this.checked = true;
	}

	public reset = (): void => {
		this.setupComplete = false;
		this.currentUser = false;
	}

	public resetCheck = (): boolean => this.checked = false;
	public respond = (): boolean => this.checked = true;
	public hasCompletedSetup = (): boolean => this.setupComplete = true;
	public setCurrentUser = (): boolean => this.currentUser = true;
	public deseclectCurrectUser = (): boolean => this.currentUser = false;
}