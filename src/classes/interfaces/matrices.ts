import ImageEnum from "../enums/image-enum";

export default interface IMatrices {
	key: string;
	size: number;
	matrix: number[][][];
	images: ImageEnum[][][];
}
