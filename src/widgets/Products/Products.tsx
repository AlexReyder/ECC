"use client"
import { CatalogCardItem } from '@/entities/'
import s from './Products.module.scss'
export const Products = (products:any) => {
	return(
			<ul className={s.List}>
				{
					products.products.map((product:any) => {
						return (
							<CatalogCardItem item={product} key={product.id}/>
						)
					})
				} 	
			</ul>
	)
}