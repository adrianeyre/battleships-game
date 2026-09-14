import { vi } from 'vitest';

import Player from '../player';
import IPlayerProps from '../interfaces/player-config';
import IPlayer from '../interfaces/player';
import Sprite from '../sprite';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

vi.mock('uuid', () => ({
  v4: () => 'uuid',
}));

describe('Player', () => {
  let defaultConfig: IPlayerProps;
  let player: IPlayer;

  beforeEach(() => {
    defaultConfig = {
      key: 'player',
      name: 'name',
      y: 1,
    };

    player = new Player(defaultConfig);
  });

  it('Should create Player class', () => {
    expect(player.key).toEqual('player');
    expect(player.id).toEqual('uuid');
    expect(player.name).toEqual('name');
    expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
    expect(player.edit).toEqual(true);
  });

  it('Should lay out a 10x10 board of sprites', () => {
    expect(player.sprites).toHaveLength(100);
    expect(player.board).toHaveLength(10);
    expect(player.board[0]).toHaveLength(10);
  });

  it('Method reset: Should reset player', () => {
    player.direction = DirectionEnum.VERTICAL;
    player.edit = false;
    player.reset();

    expect(player.direction).toEqual(DirectionEnum.HORIZONTAL);
    expect(player.edit).toEqual(true);
    expect(player.sprites).toHaveLength(100);
  });

  it('Method updateBlock: Should return ERROR when not editing', () => {
    player.edit = false;
    expect(player.updateBlock('block-that-doesnt-exist', true)).toEqual(PlayerResultEnum.ERROR);
  });

  it('Method updateBlock: Should throw when the sprite does not exist', () => {
    expect(() => player.updateBlock('block-that-doesnt-exist', true)).toThrowError(
      'No matrix or sprite found!',
    );
  });

  it('Method updateBlock: Should place every ship and finish editing', () => {
    // One ship per row, each starting at column 1, so nothing overlaps.
    const results = [1, 2, 3, 4, 5].map((row) => player.updateBlock(`player-1-${row}`, true));

    expect(results.slice(0, 4)).toEqual(Array(4).fill(PlayerResultEnum.SAFE));
    expect(results[4]).toEqual(PlayerResultEnum.DONE_EDITING);
    expect(player.edit).toEqual(false);
  });

  it('Method fire: Should miss a ship', () => {
    expect(player.fire(1, 1)).toEqual(PlayerResultEnum.MISS);
  });

  it('Method fire: Should hit a placed ship', () => {
    player.updateBlock('player-1-1', true);

    expect(player.fire(1, 1)).toEqual(PlayerResultEnum.HIT);
  });

  it('Method fire: Should report the ship sunk once every square is hit', () => {
    // The destroyer is placed first and is two squares wide.
    player.updateBlock('player-1-1', true);

    expect(player.fire(1, 1)).toEqual(PlayerResultEnum.HIT);
    expect(player.fire(2, 1)).toEqual(PlayerResultEnum.destroyer);
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
    expect(player.findSpriteByKey('player-0-0')).toEqual(undefined);
  });
});
