"use client"
import { createQueryString } from '@/shared/utils/search-params'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import slug from 'slug'
import s from './Product.module.scss'

const ProductColorsItem = ({color, image, selectedColor}: {color: string, image: string | null, selectedColor: string | null}) => {

	const colorSlug = slug(color)
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	const queries = createQueryString(searchParams, 'color', colorSlug)
	const url = pathname + '?' + queries

	function handle(){
		router.replace(url,{scroll:false})
	}

	return (
		<button onClick={handle} type='button' className={`${s.ColorFilter} ${colorSlug === selectedColor ? s.ColorFilter__selected : ''}`}>
			{image ? (<Image src={image} alt={color} fill style={{objectFit:'cover'}}/>) : (<span>{color[0]}</span>)}
		</button>
	)
}

export default ProductColorsItem

export function translate(color:string){
	if(color === 'blue') return 'синий'
	if(color === 'black') return 'черный'
	if(color === 'red') return 'красный'
	if(color === 'yellow') return 'желтый'
	if(color === 'white') return 'белый'
	if(color === 'green') return 'зеленый'
}