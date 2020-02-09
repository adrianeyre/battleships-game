import uuid from 'uuid';

import Player from '../player';
import IPlayerProps from '../interfaces/player-config';
import IPlayer from '../interfaces/player';
import Sprite from '../sprite';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

describe('Player', () => {
	let defaultConfig: IPlayerProps
	let player: IPlayer;

	beforeEach(() => {
		jest.mock('uuid/v4');
		jest.spyOn(uuid, 'v4').mockReturnValue('uuid')

		defaultConfig = {
			key: 'player',
			name: 'name',
			y: 1,
		}

		player = new Player(defaultConfig);
	})

	it('Should create Player class', () => {
		expect(player.key).toEqual('player');
		expect(player.id).toEqual('uuid');
		expect(player.name).toEqual('name');
		expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
		expect(player.edit).toEqual(true);
	});

	it('Method reset: Should reset player', () => {
		player.direction = DirectionEnum.VERTICAL;
		player.edit = false;
		player.reset();

		expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
		expect(player.edit).toEqual(true);
	});

	it('Method updateBlock: Should return ERROR when not editing', () => {
		player.edit = false;
		expect(player.updateBlock('block-that-doesnt-exist', true)).toEqual(PlayerResultEnum.ERROR);
	});

	it('Method updateBlock: Should return ERROR', () => {
		try {
			expect(player.updateBlock('block-that-doesnt-exist', true)).toThrowError('No matrix or sprite found!');
		} catch (err) {
			expect(err).toEqual(Error('No matrix or sprite found!'))
		}
	});

	it('Method fire: Should miss a ship', () => {
		expect(player.fire(1, 1)).toEqual(PlayerResultEnum.MISS);
	});

	it('Method rotate: Should rotate ship', () => {
		expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
		player.rotate('player-1-1');
		expect(player.direction).toEqual(DirectionEnum.VERTICAL);
		player.rotate('player-1-1');
		expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
	});

	it('Method findSpriteByKey: Should return a sprite', () => {
		expect(player.findSpriteByKey('player-1-1')).toBeInstanceOf(Sprite);
	});

	it('Method findSpriteByKey: Should not find a sprite', () => {
		expect(player.findSpriteByKey('player-0-0')).toEqual(undefined)
	});
});