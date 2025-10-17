import s from './Product.module.scss'

const ProductFiltersLabel = ({label, selected} : {label: string, selected: string | null| undefined}) => {
	const selectedValue = selected?.toLocaleUpperCase() ?? 'Не выбран' 
	return(
					<div className={s.ProductFilterHeadings}>
						<span className={s.ProductFilterText}>{label}: </span>
						<span className={s.ProductSelectedOption}>{selectedValue}</span>
					</div>
	)
}
export default ProductFiltersLabel;