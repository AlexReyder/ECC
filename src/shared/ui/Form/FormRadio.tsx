import Image from 'next/image'
import s from './FormRadio.module.scss'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	registerName: string
	register: any
	text: string
	id: string
	icon?: string
}

export const FormRadio = ({ registerName,register, text,id, icon, ...props }: InputProps,) => {
	return (
		<div className={s.FormRadio}>
		<p className={s.Radio}>
			<input type='radio' id={id} className={s.Input}
			{...props}
			{...register(registerName)} />
			<label
				htmlFor={id}
				className={`${s.Label}`}
			>
				{icon? <Image src={icon} alt='' width={36} height={36}/> : ''}
				{text}
			</label>
		</p>
	</div>
	)
}


