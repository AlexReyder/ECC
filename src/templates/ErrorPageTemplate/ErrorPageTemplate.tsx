import { Section } from '@/shared/ui'
import { EmptyCart } from '@/shared/ui/Icons/EmptyCart/EmptyCart'
import Link from 'next/link'
import { ReactNode } from 'react'
import s from './ErrorPageTemplate.module.scss'

interface Props{
	title?: string
	description?: string
	icon?: ReactNode
}

export const ErrorPageTemplate = ({title, description, icon}: Props) => {

	return(
		<Section className={s.Container}>
			<div className={s.Wrapper}>
				{icon ? icon : <EmptyCart className={s.Icon} fill='var(--g-color-1)'/>}
				<h3 className={s.Title}>
					{title ? title : 'Произошла ошибка'}
				</h3>
				<p className={s.Description}>
				{description ? description : 'Возникла ошибка. Обновите страницу или повторите попытку позднее.'}
				</p>
				<Link href='/' className={s.Link}>
				Перейти на главную
			</Link>
			</div>

		</Section>
	)
}