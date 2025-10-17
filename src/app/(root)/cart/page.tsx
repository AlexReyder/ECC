
import { CartPageNoProducts } from '@/entities'
import { getProductsCartLength, getProductsFromCart } from '@/shared/api/cart'
import { ICartGetProducts } from '@/shared/types/cart'
import CartPageTemplate from '@/templates/CartPageTemplate'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: "Корзина"
};

export default async function CartPage() {
	const cartLength = await getProductsCartLength()
	const cartData: ICartGetProducts = await getProductsFromCart()
	if(cartData.error || cartLength.error){
		notFound()
	}
  return (
			<main>
				{
					cartData.success.length === 0 ?
					<CartPageNoProducts/>
					:
					<CartPageTemplate cartLength = {cartLength.success} cartData={cartData.success}/>
				}
			</main>
  )
}