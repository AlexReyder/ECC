import s from './Form.module.scss'
interface Props{
	children: React.ReactNode
}
export const FormFooter = ({children}: Props) => {
	return(
		<div className={s.FormFooter}>
			{children}
		</div>
	)
}