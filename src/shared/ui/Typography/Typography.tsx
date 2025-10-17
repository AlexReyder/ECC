import classNames from '@/shared/lib/classNames/classNames'
import { ReactNode } from 'react'
import cls from './Typography.module.scss'

type variant =
	| 'decorative'
	| 'modifier'
	| 'Modal_heading'
	| 'Modal_subheading'
	| 'SliderNavigation'
	| 'SliderBtn'
	| 'Link'
	| 'h1'
	| 'h3'
	| 'h1_subheading'
	| 'h2'
	| 'h2_subheading'
	| 'service-btn'
	| 'service-link'
	| 'text'
	| 'about_slogan'
	| 'quote'
// export enum variant {
//     H1 = 'h1',
//     H1_SUBHEADING = 'h1_subheading',
//     H2 = 'h2',
//     H2_SUBHEADING = "",
//     TEXT = 'text',
//     ABOUT_SLOGAN = 'about_slogan',
//     QUOTE = 'quote'
// }
export type colors = 'white' | 'black' | 'gold' | 'grey-disabled'
type weights = 'f300' | 'f400' | 'f500' | 'f600' | 'f700' | 'f800'
type size = 's16' | 's18' | 's20' | 's24'
type align = 'left' | 'center'
type transform = 'Uppercase' | 'Lowercase'
interface TypographyProps {
	className?: string
	children: ReactNode
	variant?: variant
	color?: colors
	weights?: weights
	size?: size
	align?: align
	transform?: transform
}

export const Typography = ({
	className,
	children,
	variant,
	color = 'white',
	weights = 'f400',
	align,
	size,
	transform,
}: TypographyProps) => {
	switch (variant) {
		case 'decorative':
			return (
				<p
					className={classNames(cls.Typography, {}, [
						className!,
						cls[variant],
						cls[color],
					])}
				>
					{children}
				</p>
			)
		case 'modifier':
			return (
				<span
					className={classNames(cls.Typography, {}, [
						className!,
						cls[variant],
						cls[color],
					])}
				>
					{children}
				</span>
			)
		case 'Modal_heading':
			return (
				<h2
					className={classNames(cls.Typography, {}, [className!, cls[variant]])}
				>
					{children}
				</h2>
			)
		case 'Modal_subheading':
			return (
				<p
					className={classNames(cls.Typography, {}, [className!, cls[variant]])}
				>
					{children}
				</p>
			)
		case 'SliderNavigation':
			return (
				<span
					className={classNames(cls.Typography, {}, [
						className!!,
						cls[variant],
						cls[color],
					])}
				>
					{children}
				</span>
			)
		case 'SliderBtn':
			return (
				<span
					className={classNames(cls.Typography, {}, [
						className!!,
						cls[variant],
					])}
				>
					{children}
				</span>
			)
		case 'Link':
			return (
				<span
					className={classNames(cls.Typography, {}, [
						className!!,
						cls[variant],
					])}
				>
					{children}
				</span>
			)
		case 'h1':
			return (
				<h1
					className={classNames(cls.Typography, {}, [className!, cls[variant]])}
				>
					{children}
				</h1>
			)
		case 'h1_subheading':
			return (
				<p
					className={classNames(cls.Typography, {}, [className!, cls[variant]])}
				>
					{children}
				</p>
			)
		case 'h2_subheading':
			return (
				<h3
					className={classNames(cls.Typography, {}, [
						cls[variant],
						cls[align!],
						cls[size!],
					])}
				>
					{children}
				</h3>
			)
		case 'h2':
			return (
				<h2
					className={classNames(cls.Typography, {}, [
						className!,
						cls[variant],
						cls[color],
						cls[align!],
					])}
				>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3
					className={classNames(cls.Typography, {}, [
						className!,
						cls[variant],
						cls[color],
						cls[transform!],
						cls[align!],
					])}
				>
					{children}
				</h3>
			)
		case 'text':
			return (
				<p
					className={classNames(cls.Typography, {}, [
						className!,
						cls[variant],
						cls[color],
						cls[weights],
						cls[align!],
						cls[size!],
						cls[transform!],
					])}
				>
					{children}
				</p>
			)
		case 'service-btn':
			return (
				<p
					className={classNames(cls.Typography, {}, [
						cls[className!],
						cls[variant],
					])}
				>
					{children}
				</p>
			)
		case 'service-link':
			return (
				<p
					className={classNames(cls.Typography, {}, [
						cls[className!!],
						cls[variant],
					])}
				>
					{children}
				</p>
			)
		case 'about_slogan':
			return (
				<p
					className={classNames(cls.Typography, {}, [
						cls[className!],
						cls[variant],
						cls[color],
						cls[weights],
						cls[align!],
						cls[size!],
					])}
				>
					{children}
				</p>
			)
		case 'quote':
			return (
				<blockquote
					className={classNames(cls.Typography, {}, [
						cls[className!],
						cls[variant],
						cls[color],
						cls[weights],
						cls[align!],
						cls[size!],
					])}
				>
					{children}
				</blockquote>
			)
	}
}
