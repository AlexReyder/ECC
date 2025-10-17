import { ISizeCalculationResult } from 'image-size/types/interface'

export interface IUploadedFile{
	url: string
	name: string
	dimension: ISizeCalculationResult
}

export interface IImagesData {
	overviews: IUploadedFile[],
	originals: IUploadedFile[],
	thubnails : IUploadedFile[]
}
// export interface IImagesData {
// 	[iamgeType: string] : IUploadedFile[]
// }

