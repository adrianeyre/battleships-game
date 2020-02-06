import ImageEnum from "../enums/image-enum";

export default interface IMatrices {
	key: string;
	matrix: number[][][];
	images: ImageEnum[][][];
}
