import IGame from '../../../classes/interfaces/game';

export default interface IBattleShipsState {
	game?: IGame;
	socket?: any;
	chatMessage: string;
	messages: string[];
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	containerMargin: number;
	timer?: any;
	timerInterval: number;
}
