import IGame from '../../../classes/interfaces/game';
import IMessage from '../../../services/interfaces/message';

export default interface IBattleShipsState {
  game?: IGame;
  chatMessage: string;
  messages: IMessage[];
  spriteWidth: number;
  spriteHeight: number;
  containerWidth: number;
  containerHeight: number;
  containerMargin: number;
  timer?: ReturnType<typeof setInterval>;
  timerInterval: number;
}
