export default interface IInfoBoardProps {
	gameOver: boolean;
	score: number;
	containerHeight: number;
	startGame(playerName?: string): void;
}
