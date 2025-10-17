import classNames from '@/shared/lib/classNames/classNames'
import { ReactNode } from 'react'
import cls from './MessangerLink.module.scss'

interface MessangerLinkProps {
	className?: string
	to: string
	icon: ReactNode
}

export const MessangerLink = ({ to, className, icon }: MessangerLinkProps) => {
	return (
		<a
			href={to}
			target='_blank'
			className={classNames(cls.MessangerLink, {}, [className!])}
		>
			{icon}
		</a>
	)
}
