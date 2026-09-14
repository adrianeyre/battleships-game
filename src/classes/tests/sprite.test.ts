import SpriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import Sprite from '../sprite';
import ISpriteProps from '../interfaces/sprite-props';
import ImageEnum from '../enums/image-enum';
import ISprite from '../interfaces/sprite';

describe('Sprite', () => {
  let defaultConfig: ISpriteProps;
  let sprite: ISprite;

  beforeEach(() => {
    defaultConfig = {
      key: 'sprite',
      visable: true,
      x: 10,
      y: 10,
      xPos: 10,
      yPos: 10,
      image: ImageEnum.BLANK,
      type: SpriteTypeEnum.BLANK,
    };

    sprite = new Sprite(defaultConfig);
  });

  it('Should create Sprite class', () => {
    expect(sprite.key).toEqual('sprite');
    expect(sprite.visable).toEqual(true);
    expect(sprite.x).toEqual(10);
    expect(sprite.y).toEqual(10);
    expect(sprite.xPos).toEqual(10);
    expect(sprite.yPos).toEqual(10);
    expect(sprite.zIndex).toEqual(5000);
    expect(sprite.type).toEqual(SpriteTypeEnum.BLANK);
  });

  // The bundler rewrites image imports to URLs, so these assert on the file
  // name within the URL rather than on an exact string.
  it('Method updateImage: Should update the image', () => {
    sprite.updateImage(ImageEnum.HIT);
    expect(sprite.image).toContain('block-14');
  });

  it('Method updateType: Should update the type', () => {
    sprite.updateType(SpriteTypeEnum.carrier);
    expect(sprite.type).toEqual(SpriteTypeEnum.carrier);
  });

  it('Method isImageBlank: Should check if sprite is blank', () => {
    expect(sprite.isImageBlank()).toEqual(true);
    sprite.updateImage(ImageEnum.HIT);
    expect(sprite.isImageBlank()).toEqual(false);
  });

  it('Method fire: Should miss a ship', () => {
    expect(sprite.fire()).toEqual(PlayerResultEnum.MISS);
    expect(sprite.image).toContain('block-13');
  });

  it('Method fire: Should hit a ship', () => {
    sprite.updateImage(ImageEnum.HORIZONTAL_LEFT);
    expect(sprite.fire()).toEqual(PlayerResultEnum.HIT);
    expect(sprite.image).toContain('block-14');
  });

  it('Method hit: Should update image to hit', () => {
    expect(sprite.image).toContain('block-00');
    sprite.hit();
    expect(sprite.image).toContain('block-14');
  });

  it('Method miss: Should update image to miss', () => {
    expect(sprite.image).toContain('block-00');
    sprite.miss();
    expect(sprite.image).toContain('block-13');
  });
});
