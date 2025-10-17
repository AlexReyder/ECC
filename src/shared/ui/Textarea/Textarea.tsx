import { FieldError } from 'react-hook-form'
import s from './Textarea.module.scss'


interface TextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
	registerName: string
	register: any
	errors: FieldError | undefined
}

export const Textarea = ({ registerName,register, errors, ...props }: TextareaProps,) => {
	return (
		<div className={s.Container}>
			<textarea
				name={registerName}
				className={s.Textarea}
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


