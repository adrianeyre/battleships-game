import PlayerResultEnum from '../enums/player-result-enum';
import IPlayer from './player';
import IMessage from '../../services/interfaces/message';
import IData from '../../services/interfaces/data';
import ISprite from './sprite';

export default interface IGame {
	players: IPlayer[];
	data: IData;
	turnSprite: ISprite;
	isGameInPlay: boolean;
	flashMessage?: IMessage;
	handleInput(playerResult: PlayerResultEnum, key?: string): void;
	handleTimer(): void;
	sendMessage(message: string): void;
}
