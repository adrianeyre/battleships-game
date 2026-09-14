/**
 * The five ships each player places. Used as a key into both `IShipStatus` and
 * the `SpriteTypeEnum` / `PlayerResultEnum` members that share these names, so
 * it has to stay in step with all three.
 */
export type ShipName = 'destroyer' | 'submarine' | 'cruiser' | 'battleship' | 'carrier';

interface IValues {
  value: number;
  size: number;
}

export default interface IShipStatus {
  destroyer: IValues;
  submarine: IValues;
  cruiser: IValues;
  battleship: IValues;
  carrier: IValues;
}
