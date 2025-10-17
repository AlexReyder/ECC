import s from './Product.module.scss'

interface Props{
	isBestseller?: boolean
	isNew?: boolean
}

const ProductAttentionLabel = ({isBestseller, isNew}: Props) => {

	return (
		<>
		{(isBestseller || isNew) && (
            <div className={s.ProductAvailableLabel}>
              {isNew && (
                <span className={s.ProductAvailableLabel__new}>
                  Новинка
                </span>
              )}
              {isBestseller && (
                <span className={s.ProductAvailableLabel__bestseller}>
                  Хит
                </span>
              )}
            </div>
          )}
		</>
	)
}
export default ProductAttentionLabel