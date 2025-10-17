"use client"
import { getQueryParamValue } from '@/shared/utils/search-params'
import { useSearchParams } from 'next/navigation'
import slug from 'slug'
import s from './Product.module.scss'
import ProductColorsItem from './ProductColorsItem'
import ProductFiltersLabel from './ProductFiltersLabel'

const ProductColor = ( {colors, images, error, isImages}: {colors: string[], images: any, error: string, isImages: boolean}) => {
	const colorsArray = Object.keys(images)
	const searchParams = useSearchParams()
	const getColor = getQueryParamValue(searchParams, 'color') as string
	const selectedColor = getColor ? matchColor(colors, getColor): 'Не выбран'
  return (
		<div>
					<ProductFiltersLabel label='Цвет' selected={selectedColor}/>
					{colors.length && (
						<div className={s.FiltersList}>
							{
								colors.map((color: string, i: number) => 
									{
										return(
											<ProductColorsItem color={color} selectedColor={getColor} key={i} image={isImages ? images[slug(color)]["thumbnails"][0].url : null}/>
												)
									}
							)}
			</div>
			)}
			{error ? (
				<p className={s.ErrorProductMessage}>{error}</p>
			) : null}
		</div>
  )
}

export default ProductColor

export function matchColor(colors: string[] , colorCompare:string): string{
	let finded = ''
	colors.forEach((color: string) => {
		if(slug(color) === colorCompare){
			finded = color
		}
	})
	return finded
}