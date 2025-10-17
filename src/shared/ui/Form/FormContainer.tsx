import s from './Form.module.scss'
interface Props{
	children: React.ReactNode
	className?: string
}

export const FormContainer = ({children, className = ''}: Props) => {
	return(
		<div className={`${s.FormContainer} ${className}`}>
			{children}
		</div>
	)
}