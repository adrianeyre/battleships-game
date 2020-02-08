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