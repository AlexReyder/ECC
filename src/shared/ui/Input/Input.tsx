"use client"
import { FieldError } from 'react-hook-form'
import s from './Input.module.scss'


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	registerName: string
	register: any
	errors: FieldError | undefined
	className?: string
	onBlur?: any
}

export const Input = ({ registerName,register, errors, className, onBlur, ...props }: InputProps) => {
	return (
		<div className={`${s.Container} ${className}`}>
			<input
			  name={registerName}
				className={s.Input}
				onBlurCapture={onBlur}
				{...props}
				{...register(
					registerName
				)}
			/>
			{errors && (
				<span className={s.Error}>{errors?.message}</span>
			)}
		</div>
	)
}


