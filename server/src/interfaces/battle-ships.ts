import IMessage from './message';

export default interface IBattleShips {
	handle(data: IMessage): IMessage[];
}