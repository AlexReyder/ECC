'use client'
import { CartItem } from '@/shared/types/cart'
import { orderStatusTypes } from '@/shared/types/user'
import { OrderDb } from '@/shared/types/validation/order'
import { formatPrice } from '@/shared/utils/common'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import Image from 'next/image'
import s from '../Order/OrderCartItem.module.scss'

interface Props{
	main: OrderDb,
	item: CartItem,
	position: number,
}

const HistoryOrderItem = ({ main, item, position }: Props) => {
	const colorTranslated = item.color
	return (
				<li className={s.list__item}>
					<span className={s.list__item__pos}>
						{position}.
					</span>
					<div className={s.list__item__img}>
						<Image src={item.image} alt={item.name} fill style={{objectFit:'cover'}}/>
					</div>
					<div className={s.list__item__inner}>
						<span className={s.list__item__name}>
							{item.name}
						</span>
						<span className={s.list__item__info}>
							<span>Цвет: </span>
							<span className={s.SelectedFilter}>{colorTranslated}</span>
							
						</span>
						{item.size && (
							<span className={s.list__item__info}>
								<span>Размер: </span>
								<span className={s.SelectedFilter}>{item.size.toUpperCase()}</span>
							</span>
						)}
						<span className={s.list__item__info}>
							<span>Количество: </span>
							<span className={s.SelectedFilter}>{item.quantity} шт.</span>
						</span>

						<span className={s.list__item__info}>
							<span>Стоимость доставки: </span>
							<span className={`${s.SelectedFilter} ${s.SelectedFilter__price}`}>{formatPrice(main.deliveryPrice)} ₽</span>
						</span>

							<span className={s.list__item__info}>
							<span>Списано бонусов: </span>
							<span className={s.SelectedFilter}>{formatPrice(main.bonusMinusAmount)} </span>
						</span>
						
						<span className={s.list__item__info}>
							<span>Сумма: </span>
							<span className={`${s.SelectedFilter} ${s.SelectedFilter__price}`}>{formatPrice(+item.price * +item.quantity)} ₽</span>
						</span>

					 <span className={s.list__item__info}>
						<span> Статус заказа: </span>
						<span className={`${s.SelectedFilter} ${s.SelectedFilter__status}`}>{orderStatusTypes.filter((el) => el.value === main.status)[0].label}</span>
					</span>
					{main.trackNumber ? (  <span className={s.list__item__info}>
						<span> Трек номер: </span>
						<span className={s.SelectedFilter}>{main.trackNumber}</span>
					</span>) : <></>}
					<span className={s.list__item__info}>
						<span> Заказ оформлен: </span>
						<span className={s.SelectedFilter}>{format(main.createdAt,"d.MM.yyyy h:mm ", {locale: ru})}</span>
					</span>
					</div>
				</li>
	)
}

export default HistoryOrderItem
