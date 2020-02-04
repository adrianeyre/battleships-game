import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.key).toEqual('player');
		expect(player.score).toEqual(0);
		expect(player.lives).toEqual(3);
		expect(player.isAlive).toEqual(true);
	});

	it('Should loose player life', () => {
		const player = new Player({});

		expect(player.lives).toEqual(3);
		player.looseLife();
		expect(player.lives).toEqual(2);
	});

	it('Should add player score', () => {
		const player = new Player({});

		expect(player.score).toEqual(0);
		player.addScore(10);
		expect(player.score).toEqual(10);
	});
});