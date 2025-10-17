import { Section } from '@/shared/ui'
import { EmptyCart } from '@/shared/ui/Icons/EmptyCart/EmptyCart'
import Link from 'next/link'
import s from './CartPageNoProducts.module.scss'
export const CartPageNoProducts = () => {

	return(
		<Section className={s.Container}>
			<div className={s.Wrapper}>
				<EmptyCart className={s.Icon} fill='var(--g-color-1)'/>
				<h3 className={s.Title}>В корзине пока пусто</h3>
				<p className={s.Description}>Загляните в каталог — собрали там товары, которые могут вам понравиться</p>
				<Link href='/catalog' className={s.Link}>
				Перейти в каталог
			</Link>
			</div>

		</Section>
	)
}