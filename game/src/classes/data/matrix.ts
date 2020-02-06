import IMatrices from '../interfaces/matrices';
import ImageEnum from "../enums/image-enum";

const matrixData: IMatrices[] = [
	{
		key: 'destroyer',
		matrix: [
			[[0, 0], [1, 0]],
			[[0, 0], [0, 1]]
		],
		images: [
			[
				[ImageEnum.HORIZONTAL_LEFT, ImageEnum.HORIZONTAL_RIGHT],
				[ImageEnum.BAD_HORIZONTAL_LEFT, ImageEnum.BAD_HORIZONTAL_RIGHT]
			],
			[
				[ImageEnum.VERTICAL_UP, ImageEnum.VERTICAL_DOWN],
				[ImageEnum.BAD_VERTICAL_UP, ImageEnum.BAD_VERTICAL_DOWN]
			],
		]
	},
	{
		key: 'submarine',
		matrix: [
			[[0, 0], [1, 0], [2, 0]],
			[[0, 0], [0, 1], [0, 2]]
		],
		images: [
			[
				[ImageEnum.HORIZONTAL_LEFT, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL_RIGHT],
				[ImageEnum.BAD_HORIZONTAL_LEFT, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL_RIGHT]
			],
			[
				[ImageEnum.VERTICAL_UP, ImageEnum.VERTICAL, ImageEnum.VERTICAL_DOWN],
				[ImageEnum.BAD_VERTICAL_UP, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL_DOWN]
			],
		]
	},
	{
		key: 'cruiser',
		matrix: [
			[[0, 0], [1, 0], [2, 0]],
			[[0, 0], [0, 1], [0, 2]]
		],
		images: [
			[
				[ImageEnum.HORIZONTAL_LEFT, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL_RIGHT],
				[ImageEnum.BAD_HORIZONTAL_LEFT, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL_RIGHT]
			],
			[
				[ImageEnum.VERTICAL_UP, ImageEnum.VERTICAL, ImageEnum.VERTICAL_DOWN],
				[ImageEnum.BAD_VERTICAL_UP, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL_DOWN]
			],
		]
	},
	{
		key: 'battleship',
		matrix: [
			[[0, 0], [1, 0], [2, 0], [3, 0]],
			[[0, 0], [0, 1], [0, 2], [0, 3]]
		],
		images: [
			[
				[ImageEnum.HORIZONTAL_LEFT, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL_RIGHT],
				[ImageEnum.BAD_HORIZONTAL_LEFT, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL_RIGHT]
			],
			[
				[ImageEnum.VERTICAL_UP, ImageEnum.VERTICAL, ImageEnum.VERTICAL, ImageEnum.VERTICAL_DOWN],
				[ImageEnum.BAD_VERTICAL_UP, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL_DOWN]
			],
		]
	},
	{
		key: 'carrier',
		matrix: [
			[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
			[[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]
		],
		images: [
			[
				[ImageEnum.HORIZONTAL_LEFT, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL, ImageEnum.HORIZONTAL_RIGHT],
				[ImageEnum.BAD_HORIZONTAL_LEFT, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL, ImageEnum.BAD_HORIZONTAL_RIGHT]
			],
			[
				[ImageEnum.VERTICAL_UP, ImageEnum.VERTICAL, ImageEnum.VERTICAL, ImageEnum.VERTICAL, ImageEnum.VERTICAL_DOWN],
				[ImageEnum.BAD_VERTICAL_UP, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL, ImageEnum.BAD_VERTICAL_DOWN]
			],
		]
	},
]

export default matrixData;