"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from './ProfileAside.module.scss'

export const ProfileAside = ({isAdmin}: {isAdmin: boolean}) => {
	const path = usePathname()
	return(
		<ul className={s.List}>
			<li className={s.Item}>
				<Link href='/profile/general' className={`${s.Link} ${path==='/profile/general' ? s.Selected: ''}`}>Общая информация</Link>
			</li>
			<li className={s.Item}>
				<Link href='/profile/password' className={`${s.Link} ${path==='/profile/password' ? s.Selected: ''}`}>Смена пароля</Link>
				</li>
			<li className={s.Item}>
				<Link href='/profile/orders' className={`${s.Link} ${path==='/profile/orders' ? s.Selected: ''}`}>История заказов</Link>
				</li>
				<li className={s.Item}>
				<Link href='/profile/bonus' className={`${s.Link} ${path==='/profile/bonus' ? s.Selected: ''}`}>Программа лояльности</Link>
			</li>
			{isAdmin ? (
				<li className={s.Item}>
				<Link href='/admin' className={`${s.Link}`}>Панель администратора</Link>
				</li>
			) : null}	
		</ul>
	)
}
