import slug from 'slug'
import s from './Product.module.scss'
export const ProductTable = ({className, category, manufacturer}: {className: string, category: string, manufacturer: string | null}) =>{
	const categorySlug = slug(category)
	const manufacturerSlug = manufacturer ? slug(manufacturer) : ''
	const manufacturerFilter = manufacturerSlug === 'heaven-hell' || manufacturerSlug === 'hell-blast' ||
	manufacturerSlug === 'maldito' || manufacturerSlug === 'nacho-pop'
	return(
		<>
		{categorySlug !== 'flagi' && categorySlug !== 'nashivki' && manufacturerFilter ? 
		(<div className={`${s.TableContainer} ${className}`}>
			<img src={`/img/table/${categorySlug}_${manufacturerSlug}.jpg`} alt='Размерная сетка Maldito' width={598} height={284} className={s.TableImage}/>
		</div>
		)
		: null
	}
		</>
	)
}
