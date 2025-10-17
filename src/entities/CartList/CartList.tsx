import { CartItem, CartItems } from '@/shared/types/cart'
import s from './CartList.module.scss'
import CartListItem from './CartListItem'
interface Props{
	cartItems: CartItems
}
const CartList = ({cartItems}: Props) => {
  return (
    <>

        {cartItems.map((item:CartItem) => (
          <li
            key={item.productId + item.size}
            className={s.Item}
          >
            <CartListItem item={item} />
          </li>
        ))}

    </>
  )
}

export default CartList