import s from './ProductSpecification.module.scss'

const ProductDescription = ({description}:{description: string}) => {

	return(
		<div className={s.DescriptionContainer}>
			<h3 className={s.Heading3}>Описание:</h3>
			<p className={s.product__top__description__text}>
			{description}
		</p>
		</div>
	)
}
export default ProductDescription