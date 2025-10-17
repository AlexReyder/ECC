"use client"
import { FieldError } from 'react-hook-form'
import s from './Form.module.scss'


export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	registerName: string
	register: any
	errors: FieldError | undefined
	className?: string
	labelText: string
}

export const CheckboxForm = ({ registerName,register, errors, className, labelText, ...props }: CheckboxProps) => {
	return (
		<div className={`${s.ChecboxContainer} ${className}`}>
			<input
				type='checkbox'
				name={registerName}
				id={registerName}
				className={s.Checkbox}
				{...props}
				{...register(
					registerName
				)}
			/>
				<label htmlFor={registerName} className={s.CheckboxText}>{labelText}</label>
			{errors && (
				<span className={s.Error}>{errors?.message}</span>
			)}
		</div>
	)
}


