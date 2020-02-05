import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player();

		expect(player.key).toEqual('player');
		expect(player.score).toEqual(0);
		expect(player.isAlive).toEqual(true);
	});
});