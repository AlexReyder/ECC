import s from './ProductAvailable.module.scss'

const ProductAvailable = ({ vendorCode, isInStock }: any) => {
  return (
    <div className={s.Product}>
      <span
        className={`${s.Stock} ${
          isInStock ? s.Stock__green : s.Stock__red
        }`}
      >
        {isInStock ? 'В наличии' : 'Под заказ'}
      </span>
      <span className={s.Code}>
        Артикул
        .: {vendorCode}
      </span>
    </div>
  )
}

export default ProductAvailable