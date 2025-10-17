"use client"
import { removeProductFromCart } from '@/shared/api/cart'
import { CartItem } from '@/shared/types/cart'
import s from './CartList.module.scss'
 
const DeleteCartListItem = ({ item }: { item: CartItem }) => {

	return(
					<button
						// disabled={deleteSpinner}
						className={`btn-reset ${s.Item__delete}`}
						onClick={() => removeProductFromCart(item)}
					>
						{/* {deleteSpinner ? (
							<FontAwesomeIcon icon={faSpinner} spin color='#fff' />
						) : ( */}
							<span></span>
						{/* )} */}
					</button>
	)
}
export default DeleteCartListItem