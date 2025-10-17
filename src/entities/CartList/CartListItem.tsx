"use client"
import ProductCounter from '@/features/ProductsListItem/ProductCounter'
import { updateProductFromCart } from '@/shared/api/cart'
import { CartItem } from '@/shared/types/cart'
import { formatPrice } from '@/shared/utils/common'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import s from './CartList.module.scss'
import DeleteCartListItem from './DeleteCartListItem'


const CartListItem = ({ item }: { item: CartItem }) => {
	const {productId, size, color, name, image, price, quantity} = item
  const imageSize = 160
	const [count, setCount] = useState(+quantity)

  useEffect(() => {
    async function update() {
      await updateProductFromCart(item, count)
    }
    update()
  }, [count])

	const handleCount = (num: number) => {
		setCount(num)
	}

  return (
    <>
				<DeleteCartListItem item={item}/>
      <div
        className={`${s.Item__img} ${s.Item__block}`}
      >
        <Image
          src={image}
          alt={name}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <div className={s.Item__wrapper}>
        <div
          className={`${s.Item__name} ${s.Item__block}`}
        >
          {name}
        </div>
        <div
          className={`${s.Item__size} ${s.Item__block}`}
        >
          Цвет: {color}
        </div>
        <div
          className={`${s.Item__size} ${s.Item__block}`}
        >
          Размер: {size.toUpperCase()}
        </div>
      </div>
      <div className={s.Item__inner}>
        <div
          className={`${s.Item__initial} ${s.Item__inner__block}`}
        >
          <span
            className={`${s.Item__price} ${s.Item__initial__price}`}
          >
            {formatPrice(+price)} ₽
          </span>
          <span className={s.Item__initial__text}>
            Цена за 1 шт.
          </span>
        </div>
        <ProductCounter
								className={`cart-list__item__counter ${s.Item__counter} ${s.Item__inner__block}`}
									count={+count}
									totalCount={10}
									setCount={handleCount}
									initCount={+quantity}
								/>
        <div
          className={`${s.Item__price} ${s.Item__inner__block}`}
        >
          {/* {formatPrice(animatedPrice)} ₽ */}
        </div>
      </div>
    </>
  )
}

export default CartListItem