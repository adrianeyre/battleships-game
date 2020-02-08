enum PlayerResultEnum {
	ERROR = -1,
	SAFE = 0,
	HOVER = 1,
	SELECT = 2,
	RIGHT_SELECT = 3,
	DONE_EDITING = 4,
	FIRE = 5,
	HIT = 6,
	MISS = 7,
	DESTROYED = 8,
	destroyer = 'destroyer',
	submarine = 'submarine',
	cruiser = 'cruiser',
	battleship = 'battleship',
	carrier = 'carrier',
	ENTER = 13,
	SPACE_BAR = 32,
	ARROW_RIGHT = 39,
	ARROW_LEFT = 37,
	ARROW_DOWN = 40,
}

export default PlayerResultEnum;