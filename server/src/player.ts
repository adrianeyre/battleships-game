import IPlayer from './interfaces/player';
import IPlayerProps from './interfaces/player-props'

export default class Player implements IPlayer {
	public id: string;
	public name: string;
	public socketId: string;
	public setupComplete: boolean;

	constructor(props: IPlayerProps) {
		this.id = props.id;
		this.name = props.name;
		this.socketId = props.socketId;
		this.setupComplete = false;
	}

	public hasCompletedSetup = (): boolean => this.setupComplete = true;
}