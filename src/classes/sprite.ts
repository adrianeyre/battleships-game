import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import blank from '../images/block-00.png';
import block01 from '../images/block-01.png';
import block02 from '../images/block-02.png';
import block03 from '../images/block-03.png';
import block04 from '../images/block-04.png';
import block05 from '../images/block-05.png';
import block06 from '../images/block-06.png';
import block07 from '../images/block-07.png';
import block08 from '../images/block-08.png';
import block09 from '../images/block-09.png';
import block10 from '../images/block-10.png';
import block11 from '../images/block-11.png';
import block12 from '../images/block-12.png';
import block15 from '../images/block-15.png';
import miss from '../images/block-13.png';
import hit from '../images/block-14.png';
import PlayerResultEnum from './enums/player-result-enum';

// Keyed by ImageEnum so the lookups below stay checked. TypeScript 5.5 removed
// `suppressImplicitAnyIndexErrors`, which is what used to let a bare object
// literal be indexed by an arbitrary string here.
const IMAGES: Record<ImageEnum, string> = {
  [ImageEnum.BLANK]: blank,
  [ImageEnum.HORIZONTAL_LEFT]: block01,
  [ImageEnum.HORIZONTAL_RIGHT]: block02,
  [ImageEnum.VERTICAL_UP]: block03,
  [ImageEnum.VERTICAL_DOWN]: block04,
  [ImageEnum.HORIZONTAL]: block05,
  [ImageEnum.VERTICAL]: block06,
  [ImageEnum.BAD_HORIZONTAL_LEFT]: block07,
  [ImageEnum.BAD_HORIZONTAL_RIGHT]: block08,
  [ImageEnum.BAD_VERTICAL_UP]: block09,
  [ImageEnum.BAD_VERTICAL_DOWN]: block10,
  [ImageEnum.BAD_HORIZONTAL]: block11,
  [ImageEnum.BAD_VERTICAL]: block12,
  [ImageEnum.TURN]: block15,
  [ImageEnum.MISS]: miss,
  [ImageEnum.HIT]: hit,
};

export default class Sprite implements ISprite {
  public key: string;
  public visable: boolean;
  public x: number;
  public y: number;
  public xPos: number;
  public yPos: number;
  public zIndex: number;
  public image: string;
  public type: SpriteTypeEnum;

  private readonly Z_INDEX: number = 5000;

  constructor(config: ISpriteProps) {
    this.key = config.key;
    this.visable = config.visable;
    this.x = config.x;
    this.y = config.y;
    this.xPos = config.xPos;
    this.yPos = config.yPos;
    this.zIndex = this.Z_INDEX;
    this.image = IMAGES[config.image];
    this.type = config.type;
  }

  public updateImage = (image: ImageEnum): string => (this.image = IMAGES[image]);
  public updateType = (type: SpriteTypeEnum): SpriteTypeEnum => (this.type = type);
  public isImageBlank = (): boolean => this.image === IMAGES[ImageEnum.BLANK];

  public fire = (): PlayerResultEnum => {
    if (this.image !== IMAGES[ImageEnum.BLANK]) {
      this.image = IMAGES[ImageEnum.HIT];
      return PlayerResultEnum.HIT;
    }

    this.image = IMAGES[ImageEnum.MISS];
    return PlayerResultEnum.MISS;
  };

  public hit = () => {
    if (this.image === IMAGES[ImageEnum.BLANK]) this.image = IMAGES[ImageEnum.HIT];
  };

  public miss = () => {
    if (this.image === IMAGES[ImageEnum.BLANK]) this.image = IMAGES[ImageEnum.MISS];
  };
}
