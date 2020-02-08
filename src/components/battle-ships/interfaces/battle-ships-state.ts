import IGame from '../../../classes/interfaces/game';
import IMessage from '../../../services/interfaces/message';

export default interface IBattleShipsState {
	game?: IGame;
	socket?: any;
	chatMessage: string;
	messages: IMessage[];
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	containerMargin: number;
	timer?: any;
	timerInterval: number;
}
